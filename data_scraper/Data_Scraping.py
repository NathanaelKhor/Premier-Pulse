##importing all required libraries
from bs4 import BeautifulSoup
import pandas as pd
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# Setup Chrome options for headless browsing
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run in background
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

all_teams = [] ## list to store all teams

try:
    print("Setting up Chrome driver...")
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    print("Fetching Premier League stats page...")
    driver.get('https://fbref.com/en/comps/9/Premier-League-Stats')
    
    # Wait for page to load
    time.sleep(5)
    
    html = driver.page_source
    soup = BeautifulSoup(html, 'lxml')
    
    # Debug: check what we got
    tables = soup.find_all('table', class_ = 'stats_table')
    print(f"Found {len(tables)} tables with class 'stats_table'")
    
    if len(tables) == 0:
        # Try finding tables without specific class
        all_tables = soup.find_all('table')
        print(f"Found {len(all_tables)} tables total")
        if len(all_tables) > 0:
            print("Using first available table...")
            table = all_tables[0]
        else:
            print("No tables found. The page might still be blocked or structure changed.")
            print("First 500 chars of response:")
            print(html[:500])
            driver.quit()
            exit(1)
    else:
        table = tables[0] ##only want the first table, therefore the first index

    links = table.find_all('a') ## finding all links in the table 
    links = [l.get("href") for l in links] ##parsing through links
    links = [l for l in links if '/squads/' in l] ##filtering through links to only get squads
    
    print(f"Found {len(links)} team links")

    team_urls = [f"https://fbref.com{l}" for l in links] ## formatting back to links

    for i, team_url in enumerate(team_urls): 
        team_name = team_url.split("/")[-1].replace("-Stats", "") ##isolating the names of the teams
        print(f"Processing team {i+1}/{len(team_urls)}: {team_name}")
        
        driver.get(team_url)
        time.sleep(3)  # Wait for page to load
        
        data = driver.page_source
        soup = BeautifulSoup(data, 'lxml')
        stats_tables = soup.find_all('table', class_ = "stats_table")
        
        if len(stats_tables) == 0:
            print(f"No stats table found for {team_name}, skipping...")
            continue
            
        stats = stats_tables[0] ##again, only want the first table

        # Convert it into a DataFrame
        team_data = pd.read_html(str(stats))[0]
        
        # Handle multi-level columns if they exist
        if isinstance(team_data.columns, pd.MultiIndex):
            team_data.columns = team_data.columns.droplevel()
            
        team_data["Team"] = team_name
        all_teams.append(team_data) ## appending the data
        time.sleep(2) ## making sure we don't get blocked from scraping by delaying each loop

    # Close the browser
    driver.quit()

    if len(all_teams) > 0:
        stat_df = pd.concat(all_teams, ignore_index=True) ## concatenating all of the stats
        stat_df.to_csv("stats.csv", index=False) ## importing to csv
        print(f"Successfully scraped data for {len(all_teams)} teams and saved to stats.csv")
        print(f"Total rows of data: {len(stat_df)}")
    else:
        print("No team data was successfully scraped")

except Exception as e:
    print(f"An error occurred: {e}")
    import traceback
    traceback.print_exc()
    if 'driver' in locals():
        driver.quit()