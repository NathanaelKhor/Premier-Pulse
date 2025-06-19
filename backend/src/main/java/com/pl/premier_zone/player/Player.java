package com.pl.premier_zone.player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "players")
public class Player {

    @Id
    @Column(name = "player")
    private String name;

    @Column(name = "nation")
    private String nation;

    @Column(name = "pos")
    private String pos;

    @Column(name = "age")
    private Integer age;

    @Column(name = "mp")
    private Integer mp;

    @Column(name = "starts")
    private Integer starts;

    @Column(name = "min")
    private Double min;

    @Column(name = "nineties")
    private Double nineties;

    @Column(name = "gls")
    private Double gls;

    @Column(name = "ast")
    private Double ast;

    @Column(name = "g_a")
    private Double g_a;

    @Column(name = "gpk")
    private Double gpk;

    @Column(name = "pk")
    private Double pk;

    @Column(name = "pkatt")
    private Double pkatt;

    @Column(name = "crdy")
    private Double crdy;

    @Column(name = "crdr")
    private Double crdr;

    @Column(name = "xg")
    private Double xg;

    @Column(name = "npxg")
    private Double npxg;

    @Column(name = "xag")
    private Double xag;

    @Column(name = "npxg_xag")
    private Double npxg_xag;

    @Column(name = "prgc")
    private Double prgc;

    @Column(name = "prgp")
    private Double prgp;

    @Column(name = "prgr")
    private Double prgr;

    @Column(name = "gls_1")
    private Double gls_1;

    @Column(name = "ast_1")
    private Double ast_1;

    @Column(name = "g_a_1")
    private Double g_a_1;

    @Column(name = "gpk_1")
    private Double gpk_1;

    @Column(name = "g_apk")
    private Double g_apk;

    @Column(name = "xg_1")
    private Double xg_1;

    @Column(name = "xag_1")
    private Double xag_1;

    @Column(name = "xg_xag")
    private Double xg_xag;

    @Column(name = "npxg_1")
    private Double npxg_1;

    @Column(name = "npxg_xag_1")
    private Double npxg_xag_1;

    @Column(name = "matches")
    private String matches;

    @Column(name = "team")
    private String team;

    public Player() {}

    // You can add a constructor or builder if needed, or use Lombok for simplicity
    public Player(String name, String nation, String pos, Integer age, Integer mp, Integer starts, Double min,
              Double nineties, Double gls, Double ast, Double g_a, Double gpk, Double pk, Double pkatt,
              Double crdy, Double crdr, Double xg, Double npxg, Double xag, Double npxg_xag,
              Double prgc, Double prgp, Double prgr, Double gls_1, Double ast_1, Double g_a_1,
              Double gpk_1, Double g_apk, Double xg_1, Double xag_1, Double xg_xag,
              Double npxg_1, Double npxg_xag_1, String matches, String team) {
    this.name = name;
    this.nation = nation;
    this.pos = pos;
    this.age = age;
    this.mp = mp;
    this.starts = starts;
    this.min = min;
    this.nineties = nineties;
    this.gls = gls;
    this.ast = ast;
    this.g_a = g_a;
    this.gpk = gpk;
    this.pk = pk;
    this.pkatt = pkatt;
    this.crdy = crdy;
    this.crdr = crdr;
    this.xg = xg;
    this.npxg = npxg;
    this.xag = xag;
    this.npxg_xag = npxg_xag;
    this.prgc = prgc;
    this.prgp = prgp;
    this.prgr = prgr;
    this.gls_1 = gls_1;
    this.ast_1 = ast_1;
    this.g_a_1 = g_a_1;
    this.gpk_1 = gpk_1;
    this.g_apk = g_apk;
    this.xg_1 = xg_1;
    this.xag_1 = xag_1;
    this.xg_xag = xg_xag;
    this.npxg_1 = npxg_1;
    this.npxg_xag_1 = npxg_xag_1;
    this.matches = matches;
    this.team = team;
    }


    // --- GETTERS ---
    public String getName() { return name; }
    public String getNation() { return nation; }
    public String getPos() { return pos; }
    public Integer getAge() { return age; }
    public Integer getMp() { return mp; }
    public Integer getStarts() { return starts; }
    public Double getMin() { return min; }
    public Double getNineties() { return nineties; }
    public Double getGls() { return gls; }
    public Double getAst() { return ast; }
    public Double getG_a() { return g_a; }
    public Double getGpk() { return gpk; }
    public Double getPk() { return pk; }
    public Double getPkatt() { return pkatt; }
    public Double getCrdy() { return crdy; }
    public Double getCrdr() { return crdr; }
    public Double getXg() { return xg; }
    public Double getNpxg() { return npxg; }
    public Double getXag() { return xag; }
    public Double getNpxg_xag() { return npxg_xag; }
    public Double getPrgc() { return prgc; }
    public Double getPrgp() { return prgp; }
    public Double getPrgr() { return prgr; }
    public Double getGls_1() { return gls_1; }
    public Double getAst_1() { return ast_1; }
    public Double getG_a_1() { return g_a_1; }
    public Double getGpk_1() { return gpk_1; }
    public Double getG_apk() { return g_apk; }
    public Double getXg_1() { return xg_1; }
    public Double getXag_1() { return xag_1; }
    public Double getXg_xag() { return xg_xag; }
    public Double getNpxg_1() { return npxg_1; }
    public Double getNpxg_xag_1() { return npxg_xag_1; }
    public String getMatches() { return matches; }
    public String getTeam() { return team; }

    // --- SETTERS ---
    public void setName(String name) { this.name = name; }
    public void setNation(String nation) { this.nation = nation; }
    public void setPos(String pos) { this.pos = pos; }
    public void setAge(Integer age) { this.age = age; }
    public void setMp(Integer mp) { this.mp = mp; }
    public void setStarts(Integer starts) { this.starts = starts; }
    public void setMin(Double min) { this.min = min; }
    public void setNineties(Double nineties) { this.nineties = nineties; }
    public void setGls(Double gls) { this.gls = gls; }
    public void setAst(Double ast) { this.ast = ast; }
    public void setG_a(Double g_a) { this.g_a = g_a; }
    public void setGpk(Double gpk) { this.gpk = gpk; }
    public void setPk(Double pk) { this.pk = pk; }
    public void setPkatt(Double pkatt) { this.pkatt = pkatt; }
    public void setCrdy(Double crdy) { this.crdy = crdy; }
    public void setCrdr(Double crdr) { this.crdr = crdr; }
    public void setXg(Double xg) { this.xg = xg; }
    public void setNpxg(Double npxg) { this.npxg = npxg; }
    public void setXag(Double xag) { this.xag = xag; }
    public void setNpxg_xag(Double npxg_xag) { this.npxg_xag = npxg_xag; }
    public void setPrgc(Double prgc) { this.prgc = prgc; }
    public void setPrgp(Double prgp) { this.prgp = prgp; }
    public void setPrgr(Double prgr) { this.prgr = prgr; }
    public void setGls_1(Double gls_1) { this.gls_1 = gls_1; }
    public void setAst_1(Double ast_1) { this.ast_1 = ast_1; }
    public void setG_a_1(Double g_a_1) { this.g_a_1 = g_a_1; }
    public void setGpk_1(Double gpk_1) { this.gpk_1 = gpk_1; }
    public void setG_apk(Double g_apk) { this.g_apk = g_apk; }
    public void setXg_1(Double xg_1) { this.xg_1 = xg_1; }
    public void setXag_1(Double xag_1) { this.xag_1 = xag_1; }
    public void setXg_xag(Double xg_xag) { this.xg_xag = xg_xag; }
    public void setNpxg_1(Double npxg_1) { this.npxg_1 = npxg_1; }
    public void setNpxg_xag_1(Double npxg_xag_1) { this.npxg_xag_1 = npxg_xag_1; }
    public void setMatches(String matches) { this.matches = matches; }
    public void setTeam(String team) { this.team = team; }
}
