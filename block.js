// edit by Thích Sốt Về Đêm - GocMod Team
// Website: www.GocMod.Com
var noadsver = "$Id: no-ads.pac,v 5.125 2015/07/07 15:14:14 loverso Exp loverso $";
var normal = "DIRECT";
// *** BHP for Windows, you need to change the "0.0.0.0" to "127.0.0.1"
var blackhole = "PROXY 8.8.8.8:53";
var localproxy = normal;
var bypass = normal;
var re_banner = /\/(.*_){0,1}(ad|advert|adverts?|adimage|adframe|adserver|admentor|adview|banner|bannerimg|popup|popunder)(s)?[_.\/]/i;
var re_banner = /(\b|[_0-9])(ad|advert(ising)?|adimage|adframe|adserv|admentor|adview|banner|popup|popunder)s?(\b|[_0-9])/i;
var re_banner = /(\b|[_])(ad|advert(ising)?|adimage|adframe|adserv|admentor|adview|banner|popup|popunder)s?(\b|[_0-9])/i;
var re_banner = /[/](?!no-)([^/]*?)(\b|[_])(ad|advert(ising)?|adimage|adframe|adserv|admentor|adview|banner|popup|popunder)s?(\b|[_0-9])/i;

var re_banner  = /[/]([^/]*?)(advert|adimage|adframe|adserv|admentor|adview|banner|popunder|media\/subtract)s?/i;

var re_banner_white = /(load|feature=banner|upload_popup|popupplayer|popupmenu\.css|loginpopup|bannerbomb|popup\.lala\.com\/|css)/i;

// try to not block guids containing '...-ad...'
var re_banner2 = /[/](?!no-ads)([^/]*?([^0-9/][^-/]))?(\b|[_])(ad[s]?)(\b|[_0-9])/i;
var re_adhost = /^(ad(s)?.{0,4}\.|pop|click|cash|[^.]*banner|[^.]*adserv)/i;
var re_adhost = /^(ad(?!(min|sl|d\.))|pop|click|cash|[^.]*banner|[^.]*adserv)/i;
var re_adhost = /^(ad(?!(min|sl|d\.))|pop|click|cash|[^.]*banner|[^.]*adserv|.*\.ads\.)/i;
var re_adhost = /^(www\.)?(ad(?!(mission|visor|alur|iumx|ult|obe.*|min|sl|d|olly.*))|tology|pop|click(?!redblue)|cash|[^.]*banner|[^.]*adserv|.+\.ads?\.)/i;
var re_adhost = /\b((new)?ad(?!(venture|vantage|am|mission|visor|alur|iumx|ult|vizia|obe|min|sl|d|olly|vance))|ads\b|adserv|pop(?!ular|corn|e)|click(?!redblue|andbuy|.reference)|cash(?!back)|banner|bans)/i;
// http://www.afcyhf.com/image-1742473-10472361
// http://www.tkqlhce.com/image-1742473-10510557
var re_crud = /www\.\w+\.com\/image-\d+-\d+$/;
// neg:
//	admin.foobar.com
//	add.iahoo.com
//	adsl.allow.com
//	administration.all.net
// pos:
//	fire.ads.ighoo.com
//	ads.foo.org
//	ad0121.aaaa.com
//	adserver.goo.biz
//	popup.foo.bar

// matched against hostname
var re_whitelist_domains = /(^|\.)(adorama\.com|adafruit\..*|advogato\.org|adirondack\..*|kintera\.org|sprintpcs\.com|adp\.com|lego\.com|dell\.com|mozdev\.org|mozilla\.org|fidelity\.com|tirerack\.com|titantv\.com|lala\.com|sprint\.com|nextel\.com|verizon\.com|vupload\.facebook\.com|rit\.edu|mididb\.com|sony\.tv|market\.android\.com|weeklyad\.staples\.com|(code|plus|www|mail|apis|drive|docs)\.google\.com|googleadservices\.com|gmail\.com|gstatic\.com|thetvdb\.com|bits\te.wikimedia\.org|css\.slickdealscdn\.com|newegg\.com|androiddrawer\.com|addons\.cdn\.mozilla\.net|wsj\.com|massdrop\.com|cloudfront\.net|ad.*\.rackcdn\.com|bankofamerica.com)$/i;

var isActive = 1;

function FindProxyForURL(url, host)
{

    if (shExpMatch(host, "no-ads.int")) {
        if (shExpMatch(url, "*/on*")) {
	    isActive = 1;
	    //LOG alert("no-ads has been enabled.\n" + url);
	} else if (shExpMatch(url, "*/off*")) {
	    isActive = 0;
	    //LOG alert("no-ads has been disabled.\n" + url);
	} else if (shExpMatch(url, "*no-ads.int/")) {
	    alert("no-ads is "+(isActive ? "enabled" : "disabled")+".\n" + url);
	} else {
	    alert("no-ads unknown option.\n" + url);
	}

	return blackhole;
    }

    if (!isActive) {
	//LOG3 alert("no-ads inactive bypass: " + url);
	return bypass;
    }

    // Suggestion from Quinten Martens
    // Make everything lower case.
    // WARNING: all shExpMatch rules following MUST be lowercase!
    url = url.toLowerCase();
    host = host.toLowerCase();

    //
    // Local/Internal rule
    // matches to this rule get the 'local' proxy.
    // Adding rules here enables the use of 'local'
    //
    if (0
	//LOCAL-RULES
	// add rules such as:
  	//	|| dnsDomainIs(host, "schooner.com")
	//	|| isPlainHostName(host)
	// or for a single host
	//	|| (host == "some-local-host")
    ) {
	//LOG3 alert("no-ads local: " + url);
	return localproxy;
    }

    //
    // Whitelist section (originally from InvisiBill)
    //
    // Include sites here that should never be matched for ads.
    //
    if (0
	//WHITELIST-RULES
    	// To add whitelist domains, simple add a line such as:
  	//	|| dnsDomainIs(host, "schooner.com")
	// or for a single host
	//	|| (host == "some-host-name")

	// Note: whitelisting schooner.com will defeat the "is-it-working"
	// test page at http://www.schooner.com/~loverso/no-ads/ads/

	// any whitelisted domain
	|| re_whitelist_domains.test(host)

	// Apple.com "Switch" ads
	|| shExpMatch(url, "*.apple.com/switch/ads/*")

	// Uncomment for metacrawler
	// || (host == "clickit.go2net.com")

	|| (host == "adf.ly"
	    && shExpMatch(url, "*/http:/*"))
	|| (host == "cdn.adf.ly"
	    && shExpMatch(url, "*js"))

	|| (host == "images.rottentomatoescdn.com"
	    && shExpMatch(url, "*/scripts?"))

        // Wunderground (weather station 'banners')
	|| ((   dnsDomainIs(host, ".wunderground.com")
	     || dnsDomainIs(host, ".wund.com")
	    )
	    && (   shExpMatch(url, "*/cgi-bin/banner/ban/wxbanner*")
		|| shExpMatch(url, "*/weathersticker/*")
		|| shExpMatch(url, "*/cgi-bin/satbanner*")
	    )
	   )
    ) {
	//LOG3 alert("no-ads whitelist: " + url);
	return normal;
    }

    // To add more sites, simply include them in the correct format.
    //
    // The sites below are ones I currently block.  Tell me of others you add!

    // Remove the "//DEBUG2" to enable debug messages
    if (0
	//BLOCK-RULES
	//DEBUG2 || alert("start")

	// Block IE "favicon.ico" fetches
	// (to avoid being tracked as having bookmarked the site)
	|| shExpMatch(url, "*/favicon.*")
	|| shExpMatch(url, "*/animated_favicon*")

	//////
	//
	// Global Section
	// tries to match common names
	//

	// REs for common URL paths
	//
	//DEBUG2 || ((m = re_banner.exec(url)) && alert("re_banner\n0= " + m[0]+"\n1= " + m[1]+"\n2= " + m[2]+"\n3= " + m[3]+"\n4= " + m[4]))
	//DEBUG2 || ((m = re_banner_white.exec(url)) && alert("re_banner_white\n0= " + m[0]+"\n1= " + m[1]+"\n2= " + m[2]+"\n"))
	//
	|| (re_banner.test(url) && !re_banner_white.test(url))
	//
	//DEBUG2 || alert("passed re_banner")

	//DEBUG2 || ((m = re_banner2.exec(url)) && alert("re_banner2\n0= " + m[0]+"\n1= " + m[1]+"\n2= " + m[2]+"\n3= " + m[3]+"\n4= " + m[4]))
	//
	|| re_banner2.test(url)
	//
	//DEBUG2 || alert("passed re_banner2")

	// RE for common adserver hostnames.
	// The regexp matches all hostnames starting with "ad" that are not
	//	admin|add|adsl
	// (replaces explicit shExpMatch's below)
	|| re_adhost.test(host)
	//
	//DEBUG2 || alert("passed re_adhost")

	//////
	//
	// banner/ad organizations
	// Just delete the entire namespace
	//
	
	// Facebook ... The new evil
//	|| (dnsDomainIs(host, ".facebook.com")
//	    && (shExpMatch(url, "*/plugins/like*")
//	    )
//	)
//	|| dnsDomainIs(host, ".fbcdn.net")

        // doubleclick
	|| dnsDomainIs(host, ".doubleclick.com")
        || dnsDomainIs(host, ".doubleclick.net")
        || dnsDomainIs(host, ".rpts.net")
	|| dnsDomainIs(host, ".2mdn.net")
	|| dnsDomainIs(host, ".2mdn.com")

	|| dnsDomainIs(host, ".chartbeat.net")
	|| dnsDomainIs(host, ".chitika.net")

	// these set cookies
	|| dnsDomainIs(host, ".globaltrack.com")
	|| dnsDomainIs(host, ".burstnet.com")
	|| dnsDomainIs(host, ".adbureau.net")
	|| dnsDomainIs(host, ".targetnet.com")
	|| dnsDomainIs(host, ".humanclick.com")
	|| dnsDomainIs(host, ".linkexchange.com")

	|| dnsDomainIs(host, ".fastclick.com")
	|| dnsDomainIs(host, ".fastclick.net")

        // one whole class C full of ad servers (fastclick)
	// XXX this might need the resolver
//        || isInNet(host, "205.180.85.0", "255.255.255.0")
	|| shExpMatch(host, "205.180.85.*")

	// these use 1x1 images to track you
	|| dnsDomainIs(host, ".admonitor.com")
	|| dnsDomainIs(host, ".focalink.com")

	|| dnsDomainIs(host, ".websponsors.com")
	|| dnsDomainIs(host, ".advertising.com")
	|| dnsDomainIs(host, ".cybereps.com")
	|| dnsDomainIs(host, ".postmasterdirect.com")
	|| dnsDomainIs(host, ".mediaplex.com")
	|| dnsDomainIs(host, ".adtegrity.com")
	|| dnsDomainIs(host, ".bannerbank.ru")
	|| dnsDomainIs(host, ".bannerspace.com")
	|| dnsDomainIs(host, ".theadstop.com")
	|| dnsDomainIs(host, ".l90.com")
	|| dnsDomainIs(host, ".webconnect.net")
	|| dnsDomainIs(host, ".avenuea.com")
	|| dnsDomainIs(host, ".flycast.com")
	|| dnsDomainIs(host, ".engage.com")
	|| dnsDomainIs(host, ".imgis.com")
	|| dnsDomainIs(host, ".datais.com")
	|| dnsDomainIs(host, ".link4ads.com")
	|| dnsDomainIs(host, ".247media.com")
	|| dnsDomainIs(host, ".hightrafficads.com")
	|| dnsDomainIs(host, ".tribalfusion.com")
	|| dnsDomainIs(host, ".rightserve.net")
	|| dnsDomainIs(host, ".admaximize.com")
	|| dnsDomainIs(host, ".valueclick.com")
	|| dnsDomainIs(host, ".adlibris.se")
	|| dnsDomainIs(host, ".vibrantmedia.com")
	|| dnsDomainIs(host, ".coremetrics.com")
	|| dnsDomainIs(host, ".vx2.cc")
	|| dnsDomainIs(host, ".webpower.com")
	|| dnsDomainIs(host, ".everyone.net")
	|| dnsDomainIs(host, ".zedo.com")
	|| dnsDomainIs(host, ".bigbangmedia.com")
	|| dnsDomainIs(host, ".ad-annex.com")
	|| dnsDomainIs(host, ".iwdirect.com")
	|| dnsDomainIs(host, ".adlink.de")
	|| dnsDomainIs(host, ".bidclix.net")
	|| dnsDomainIs(host, ".webclients.net")
	|| dnsDomainIs(host, ".linkcounter.com")
	|| dnsDomainIs(host, ".sitetracker.com")
	|| dnsDomainIs(host, ".adtrix.com")
	|| dnsDomainIs(host, ".netshelter.net")
	|| dnsDomainIs(host, ".rn11.com")
	// http://vpdc.ru4.com/content/images/66/011.gif
	|| dnsDomainIs(host, ".ru4.com")
	// no '.' for rightmedia.net
	|| dnsDomainIs(host, "rightmedia.net")
	|| dnsDomainIs(host, ".casalemedia.com")
	|| dnsDomainIs(host, ".casalemedia.com")
	|| dnsDomainIs(host, "quantserve.com")
	|| dnsDomainIs(host, "quantcast.com")
	|| dnsDomainIs(host, "crwdcntrl.net")
	|| dnsDomainIs(host, "scorecardresearch.net")
	|| dnsDomainIs(host, "pubmatic.net")
	|| dnsDomainIs(host, "yumenetworks.com")
	|| dnsDomainIs(host, "brilig.com")

	|| dnsDomainIs(host, "perfb.com")
	|| dnsDomainIs(host, "blogads.com")

	|| dnsDomainIs(host, "fetchback.com")
	|| dnsDomainIs(host, "creatives.badongo.com")
	|| dnsDomainIs(host, "pmsrvr.com")
	|| dnsDomainIs(host, "trafficmack.com")


	// C-J
	|| dnsDomainIs(host, ".commission-junction.com")
	|| dnsDomainIs(host, ".qkimg.net")
	// emjcd.com ... many others

	// */adv/*
	|| dnsDomainIs(host, ".bluestreak.com")

	// Virtumundo -- as annoying as they get
	|| dnsDomainIs(host, ".virtumundo.com")
	|| dnsDomainIs(host, ".treeloot.com")
	|| dnsDomainIs(host, ".memberprize.com")

	// internetfuel and _some_ of the sites they redirect to
	// (more internetfuel - from Sam G)
	|| dnsDomainIs(host, ".internetfuel.net")
	|| dnsDomainIs(host, ".internetfuel.com")
	|| dnsDomainIs(host, ".peoplecaster.com")
	|| dnsDomainIs(host, ".cupidsdatabase.com")
	|| dnsDomainIs(host, ".automotive-times.com")
	|| dnsDomainIs(host, ".healthy-lifetimes.com")
	|| dnsDomainIs(host, ".us-world-business.com")
	|| dnsDomainIs(host, ".internet-2-web.com")
	|| dnsDomainIs(host, ".my-job-careers.com")
	|| dnsDomainIs(host, ".freeonline.com")
	|| dnsDomainIs(host, ".exitfuel.com")
	|| dnsDomainIs(host, ".netbroadcaster.com")
	|| dnsDomainIs(host, ".spaceports.com")
	|| dnsDomainIs(host, ".mircx.com")
	|| dnsDomainIs(host, ".exitchat.com")
	|| dnsDomainIs(host, ".atdmt.com")
	|| dnsDomainIs(host, ".partner2profit.com")
	|| dnsDomainIs(host, ".centrport.net")
	|| dnsDomainIs(host, ".centrport.com")
	|| dnsDomainIs(host, ".rampidads.com")

	|| dnsDomainIs(host, ".dt07.net")

	//////
	
	//tsvd host
	|| dnsDomainIshost, "pagead2.googlesyndication.com")
	|| dnsDomainIshost, "exosrv.com")
	|| dnsDomainIshost, "omtrdc.net")
	|| dnsDomainIshost, "coremetrics.com")
	|| dnsDomainIshost, "100651.advision-adnw.jp")
	|| dnsDomainIshost, "2.chmato.me")
	|| dnsDomainIshost, "2mdn.info")
	|| dnsDomainIshost, "4clvr.jp")
	|| dnsDomainIshost, "a-c-engine.com")
	|| dnsDomainIshost, "a-cast.jp")
	|| dnsDomainIshost, "a.cookpad-ads.com")
	|| dnsDomainIshost, "a1.goo.ne.jp")
	|| dnsDomainIshost, "aaaf.jp")
	|| dnsDomainIshost, "aaddcount.com")
	|| dnsDomainIshost, "aag.yahooapis.jp")
	|| dnsDomainIshost, "accessup.goldcows.com")
	|| dnsDomainIshost, "act.ameba.jp")
	|| dnsDomainIshost, "ad-alp.net")
	|| dnsDomainIshost, "ad-analyze.jp")
	|| dnsDomainIshost, "ad-api-v01.uliza.jp")
	|| dnsDomainIshost, "ad-arata.com")
	|| dnsDomainIshost, "ad-arata.s3.amazonaws.com")
	|| dnsDomainIshost, "ad-bemti.com")
	|| dnsDomainIshost, "ad-brix.com")
	|| dnsDomainIshost, "ad-cloud.jp")
	|| dnsDomainIshost, "ad-count.jp")
	|| dnsDomainIshost, "ad-feed.com")
	|| dnsDomainIshost, "ad-hatena.com")
	|| dnsDomainIshost, "ad-house.mobi")
	|| dnsDomainIshost, "ad-image.val.jp")
	|| dnsDomainIshost, "ad-info.val.jp")
	|| dnsDomainIshost, "ad-link.jp")
	|| dnsDomainIshost, "ad-lista.com")
	|| dnsDomainIshost, "ad-m.asia")
	|| dnsDomainIshost, "ad-miner.com")
	|| dnsDomainIshost, "ad-move.jp")
	|| dnsDomainIshost, "ad-seek.jp")
	|| dnsDomainIshost, "ad-shot.com")
	|| dnsDomainIshost, "ad-sp.biz")
	|| dnsDomainIshost, "ad-srv.co")
	|| dnsDomainIshost, "ad-stir.com")
	|| dnsDomainIshost, "ad-trip.com")
	|| dnsDomainIshost, "ad-v.jp")
	|| dnsDomainIshost, "ad-vanx.com")
	|| dnsDomainIshost, "ad.adsrvr.org")
	|| dnsDomainIshost, "ad.affipa.ne.jp")
	|| dnsDomainIshost, "ad.agilemedia.jp")
	|| dnsDomainIshost, "ad.angel-live.com")
	|| dnsDomainIshost, "ad.api.fello.net")
	|| dnsDomainIshost, "ad.atdmt.com")
	|| dnsDomainIshost, "ad.auditude.com")
	|| dnsDomainIshost, "ad.axyzconductor.jp")
	|| dnsDomainIshost, "ad.brainer.jp")
	|| dnsDomainIshost, "ad.cq-andc.jp")
	|| dnsDomainIshost, "ad.dlbooks.to")
	|| dnsDomainIshost, "ad.dmm.com")
	|| dnsDomainIshost, "ad.douga-kan.com")
	|| dnsDomainIshost, "ad.dropbooks.tv")
	|| dnsDomainIshost, "ad.duga.jp")
	|| dnsDomainIshost, "ad.goo.ne.jp")
	|| dnsDomainIshost, "ad.goodad.jp")
	|| dnsDomainIshost, "ad.gunosy.com")
	|| dnsDomainIshost, "ad.hatena.ne.jp")
	|| dnsDomainIshost, "ad.heypo.com")
	|| dnsDomainIshost, "ad.impressbm.co.jp")
	|| dnsDomainIshost, "ad.internetcom.jp")
	|| dnsDomainIshost, "ad.jorudan.co.jp")
	|| dnsDomainIshost, "ad.jp.ap.valuecommerce.com")
	|| dnsDomainIshost, "ad.mediba.jp")
	|| dnsDomainIshost, "ad.netowl.jp")
	|| dnsDomainIshost, "ad.pitta.ne.jp")
	|| dnsDomainIshost, "ad.plus-a.net")
	|| dnsDomainIshost, "ad.response.jp")
	|| dnsDomainIshost, "ad.somewrite.jp")
	|| dnsDomainIshost, "ad.sp.mbga.jp")
	|| dnsDomainIshost, "ad.val.jp")
	|| dnsDomainIshost, "ad.valuecommerce.com")
	|| dnsDomainIshost, "ad.webdice.jp")
	|| dnsDomainIshost, "ad.wiredvision.jp")
	|| dnsDomainIshost, "ad.xdomain.ne.jp")
	|| dnsDomainIshost, "ad2.fm-p.jp")
	|| dnsDomainIshost, "ad2.maho.jp")
	|| dnsDomainIshost, "adap.tv")
	|| dnsDomainIshost, "adapf.com")
	|| dnsDomainIshost, "adapi.gunosy.com")
	|| dnsDomainIshost, "adb.nikkei.co.jp")
	|| dnsDomainIshost, "adcdn.goo.ne.jp")
	|| dnsDomainIshost, "adck.crooz.jp")
	|| dnsDomainIshost, "adcloud.jp")
	|| dnsDomainIshost, "adclr.jp")
	|| dnsDomainIshost, "adcolony.com")
	|| dnsDomainIshost, "adcrops.net")
	|| dnsDomainIshost, "adcv.jp")
	|| dnsDomainIshost, "addelivery.seedapp.jp")
	|| dnsDomainIshost, "addeluxe.jp")
	|| dnsDomainIshost, "adf.shinobi.jp")
	|| dnsDomainIshost, "adflare.bz")
	|| dnsDomainIshost, "adflare.jp")
	|| dnsDomainIshost, "adforest.net")
	|| dnsDomainIshost, "adfurikun.jp")
	|| dnsDomainIshost, "adglare.net")
	|| dnsDomainIshost, "adgrip.net")
	|| dnsDomainIshost, "adimg.net")
	|| dnsDomainIshost, "adimp.excite.co.jp")
	|| dnsDomainIshost, "adingo.jp")
	|| dnsDomainIshost, "adingo.jp.eimg.jp")
	|| dnsDomainIshost, "adinte.jp")
	|| dnsDomainIshost, "adjust-net.jp")
	|| dnsDomainIshost, "adjust-sp.jp")
	|| dnsDomainIshost, "adk2x.com")
	|| dnsDomainIshost, "adlantis.jp")
	|| dnsDomainIshost, "adlib.cptv.jp ")
	|| dnsDomainIshost, "adlpo.com")
	|| dnsDomainIshost, "adm.fwmrm.net")
	|| dnsDomainIshost, "adm.shinobi.jp")
	|| dnsDomainIshost, "admeme.net")
	|| dnsDomainIshost, "adminer.com")
	|| dnsDomainIshost, "adming.net")
	|| dnsDomainIshost, "admtpmp123.com")
	|| dnsDomainIshost, "admtpmp124.com")
	|| dnsDomainIshost, "adnetworkperformance.com")
	|| dnsDomainIshost, "adnico.jp")
	|| dnsDomainIshost, "adntokyo.gunosy.com")
	|| dnsDomainIshost, "adnwif.smt.docomo.ne.jp")
	|| dnsDomainIshost, "adnxs.com")
	|| dnsDomainIshost, "adone.yicha.jp")
	|| dnsDomainIshost, "adpdx.com")
	|| dnsDomainIshost, "adpix.jp")
	|| dnsDomainIshost, "adplan-ds.com")
	|| dnsDomainIshost, "adplatform.jp")
	|| dnsDomainIshost, "adpon.net")
	|| dnsDomainIshost, "adpresso.valuecommerce.com")
	|| dnsDomainIshost, "adpriv.nikkei.com")
	|| dnsDomainIshost, "adrcf.com")
	|| dnsDomainIshost, "adresult-sp.jp")
	|| dnsDomainIshost, "adresult.jp")
	|| dnsDomainIshost, "adroll.com")
	|| dnsDomainIshost, "ads-api.hackadoll.com")
	|| dnsDomainIshost, "ads-i2i.jp")
	|| dnsDomainIshost, "ads-tool.jp")
	|| dnsDomainIshost, "ads-twitter.com")
	|| dnsDomainIshost, "ads.doko.jp")
	|| dnsDomainIshost, "ads.gold")
	|| dnsDomainIshost, "ads.heyzap.com")
	|| dnsDomainIshost, "ads.mediasmart.es")
	|| dnsDomainIshost, "ads.mixi.jp")
	|| dnsDomainIshost, "ads.mopub.com")
	|| dnsDomainIshost, "ads.nexage.com")
	|| dnsDomainIshost, "ads.nikkeibp.co.jp")
	|| dnsDomainIshost, "ads.pubmatic.com")
	|| dnsDomainIshost, "ads1.jp.msn.com")
	|| dnsDomainIshost, "ads1.msads.net")
	|| dnsDomainIshost, "ads2-adnow.com")
	|| dnsDomainIshost, "ads280dummy.com")
	|| dnsDomainIshost, "adsee.jp")
	|| dnsDomainIshost, "adsensecustomsearchads.com")
	|| dnsDomainIshost, "adservice.google.com")
	|| dnsDomainIshost, "adsk2.co")
	|| dnsDomainIshost, "adsnative.com")
	|| dnsDomainIshost, "adstore.jp")
	|| dnsDomainIshost, "adtc.daum.net")
	|| dnsDomainIshost, "adtdp.com")
	|| dnsDomainIshost, "adtech.de")
	|| dnsDomainIshost, "adtechjp.com")
	|| dnsDomainIshost, "adticker.net")
	|| dnsDomainIshost, "adtilt.com")
	|| dnsDomainIshost, "adtrack.king.com")
	|| dnsDomainIshost, "adtracker.jp")
	|| dnsDomainIshost, "adultmild.com")
	|| dnsDomainIshost, "adultsuns.net")
	|| dnsDomainIshost, "adv.mobsmart.net")
	|| dnsDomainIshost, "advertising.jp.msn.com")
	|| dnsDomainIshost, "advisionclick.yicha.jp")
	|| dnsDomainIshost, "advisionweb.yicha.jp")
	|| dnsDomainIshost, "advisionwebp.yicha.jp")
	|| dnsDomainIshost, "advnet.xyz")
	|| dnsDomainIshost, "advpic.yicha.jp")
	|| dnsDomainIshost, "adxpansion.com")
	|| dnsDomainIshost, "adxxx.org")
	|| dnsDomainIshost, "adzerk.net")
	|| dnsDomainIshost, "af-110.com")
	|| dnsDomainIshost, "af.moshimo.com")
	|| dnsDomainIshost, "aff.jskyservices.com")
	|| dnsDomainIshost, "affil.jp")
	|| dnsDomainIshost, "affiliate.dtiserv.com")
	|| dnsDomainIshost, "affiliate.rakuten.co.jp")
	|| dnsDomainIshost, "affiliateone.jp")
	|| dnsDomainIshost, "afte.mopo.jp")
	|| dnsDomainIshost, "aid-ad.jp")
	|| dnsDomainIshost, "aimg.fc2.com")
	|| dnsDomainIshost, "aja-recommend.com")
	|| dnsDomainIshost, "aka-uae-dl.uliza.jp")
	|| dnsDomainIshost, "alogs.umengcloud.com")
	|| dnsDomainIshost, "aml.valuecommerce.com")
	|| dnsDomainIshost, "amoad.com")
	|| dnsDomainIshost, "analytics.cocolog-nifty.com")
	|| dnsDomainIshost, "analytics.qlook.net")
	|| dnsDomainIshost, "analyzer54.fc2.com")
	|| dnsDomainIshost, "analyzer55.fc2.com")
	|| dnsDomainIshost, "android.giveapp.jp")
	|| dnsDomainIshost, "antennash.com")
	|| dnsDomainIshost, "aos-creative.prf.hn")
	|| dnsDomainIshost, "api-05.com")
	|| dnsDomainIshost, "api.appsflyer.com")
	|| dnsDomainIshost, "api.cho-ro.club")
	|| dnsDomainIshost, "api.gameanalytics.com")
	|| dnsDomainIshost, "api.inwemo.com")
	|| dnsDomainIshost, "api.primecaster.net")
	|| dnsDomainIshost, "api.uca.cloud.unity3d.com")
	|| dnsDomainIshost, "api.webpush.jp")
	|| dnsDomainIshost, "aplkp.valuecommerce.com")
	|| dnsDomainIshost, "app-c.net")
	|| dnsDomainIshost, "app-measurement.com")
	|| dnsDomainIshost, "app.adjust.com")
	|| dnsDomainIshost, "appad.click")
	|| dnsDomainIshost, "appad02.mbsp.jp")
	|| dnsDomainIshost, "appier.mobi")
	|| dnsDomainIshost, "applipromotion.com")
	|| dnsDomainIshost, "appnext-a.akamaihd.net")
	|| dnsDomainIshost, "appnext.com")
	|| dnsDomainIshost, "appnext.hs.llnwd.net")
	|| dnsDomainIshost, "appsdt.com")
	|| dnsDomainIshost, "apserver.net")
	|| dnsDomainIshost, "apvdr.com")
	|| dnsDomainIshost, "aqua.dmm.co.jp")
	|| dnsDomainIshost, "ard.gree.net")
	|| dnsDomainIshost, "aspm.jp")
	|| dnsDomainIshost, "assys01.fc2.com")
	|| dnsDomainIshost, "astrsk.net")
	|| dnsDomainIshost, "atech.ne.jp")
	|| dnsDomainIshost, "atwola.com")
	|| dnsDomainIshost, "authedmine.com")
	|| dnsDomainIshost, "avalon-ad.net")
	|| dnsDomainIshost, "avdm.mobi")
	|| dnsDomainIshost, "axia-hakusan.com")
	|| dnsDomainIshost, "azvjudwr.info")
	|| dnsDomainIshost, "b.grvcdn.com")
	|| dnsDomainIshost, "b.smartnews.be")
	|| dnsDomainIshost, "b92.yahoo.co.jp")
	|| dnsDomainIshost, "b97.yahoo.co.jp")
	|| dnsDomainIshost, "ba.afl.rakuten.co.jp")
	|| dnsDomainIshost, "banner.blogranking.net")
	|| dnsDomainIshost, "bc.atleit.com")
	|| dnsDomainIshost, "bead-ad.com")
	|| dnsDomainIshost, "bibincom.com")
	|| dnsDomainIshost, "bidswitch.net")
	|| dnsDomainIshost, "bizad.nikkeibp.co.jp")
	|| dnsDomainIshost, "black-diamond.asia")
	|| dnsDomainIshost, "blog-livedorr.com")
	|| dnsDomainIshost, "blog.alivedoors.com")
	|| dnsDomainIshost, "blogranking.fc2.com")
	|| dnsDomainIshost, "blogroll.click")
	|| dnsDomainIshost, "blogroll.livedoor.net")
	|| dnsDomainIshost, "bluekai.com")
	|| dnsDomainIshost, "bongacams.com")
	|| dnsDomainIshost, "bootstrapcdn.jdorfman.netdna-cdn.com")
	|| dnsDomainIshost, "boxadstop.com")
	|| dnsDomainIshost, "brandscreen.biz")
	|| dnsDomainIshost, "broadstreetads.com")
	|| dnsDomainIshost, "btstatic.com")
	|| dnsDomainIshost, "bufferapp.com")
	|| dnsDomainIshost, "bvezznurwekr.com")
	|| dnsDomainIshost, "bypass.jp")
	|| dnsDomainIshost, "c1exchange.com")
	|| dnsDomainIshost, "ca-conv.jp")
	|| dnsDomainIshost, "caprofitx.adtop.com")
	|| dnsDomainIshost, "caprofitx.com")
	|| dnsDomainIshost, "cdn-guile.akamaized.net")
	|| dnsDomainIshost, "cdn.ad1-click.com")
	|| dnsDomainIshost, "cdn.alistcloud.com")
	|| dnsDomainIshost, "cdn.cloudcoins.co")
	|| dnsDomainIshost, "cdn.pic.crooz.jp")
	|| dnsDomainIshost, "cdn.taboolasyndication.com")
	|| dnsDomainIshost, "cdn.treasuredata.com")
	|| dnsDomainIshost, "cdn.z-profit.com")
	|| dnsDomainIshost, "cdns.lodeo.io")
	|| dnsDomainIshost, "cint.com")
	|| dnsDomainIshost, "click-plus.net")
	|| dnsDomainIshost, "click.adv.livedoor.com")
	|| dnsDomainIshost, "click.duga.jp")
	|| dnsDomainIshost, "clickadu.com")
	|| dnsDomainIshost, "clksite.com")
	|| dnsDomainIshost, "cloudmobi.net")
	|| dnsDomainIshost, "cnhv.co")
	|| dnsDomainIshost, "cnt.affiliate.fc2.com")
	|| dnsDomainIshost, "cocoad.jp")
	|| dnsDomainIshost, "coin-have.com")
	|| dnsDomainIshost, "coin-hive.com")
	|| dnsDomainIshost, "coinblind.com")
	|| dnsDomainIshost, "coinerra.com")
	|| dnsDomainIshost, "coinhive.com")
	|| dnsDomainIshost, "coinhiveproxy.com")
	|| dnsDomainIshost, "coinlab.biz")
	|| dnsDomainIshost, "coinnebula.com")
	|| dnsDomainIshost, "comic-promotion.com")
	|| dnsDomainIshost, "cosmi.io")
	|| dnsDomainIshost, "count-ad.net")
	|| dnsDomainIshost, "counter.yadro.ru")
	|| dnsDomainIshost, "cpmly.com")
	|| dnsDomainIshost, "crashlytics.com")
	|| dnsDomainIshost, "creativecarrer.com")
	|| dnsDomainIshost, "crispadvertising.com")
	|| dnsDomainIshost, "criteo.com")
	|| dnsDomainIshost, "criteo.net")
	|| dnsDomainIshost, "crypto-loot.com")
	|| dnsDomainIshost, "cs.r-ad.ne.jp")
	|| dnsDomainIshost, "csi.gstatic.com")
	|| dnsDomainIshost, "ct2.shinobi.jp")
	|| dnsDomainIshost, "cube.jpn.com")
	|| dnsDomainIshost, "cyberwing.co.jp")
	|| dnsDomainIshost, "d.5.to")
	|| dnsDomainIshost, "d.pixiv.org")
	|| dnsDomainIshost, "d.somewrite.jp")
	|| dnsDomainIshost, "d1miuq6afqay8u.cloudfront.net")
	|| dnsDomainIshost, "d28nwox1gdjlve.cloudfront.net")
	|| dnsDomainIshost, "d2c.ne.jp")
	|| dnsDomainIshost, "deliver.ads2.iid.jp")
	|| dnsDomainIshost, "delivery.locari.jp")
	|| dnsDomainIshost, "directlink.jp")
	|| dnsDomainIshost, "directrev.com")
	|| dnsDomainIshost, "disqusads.com")
	|| dnsDomainIshost, "dlp4luwpus5kr.cloudfront.net")
	|| dnsDomainIshost, "dlv.itmedia.jp")
	|| dnsDomainIshost, "doga.cm")
	|| dnsDomainIshost, "dominoad.com")
	|| dnsDomainIshost, "doprads.jp")
	|| dnsDomainIshost, "dot-metrix.com")
	|| dnsDomainIshost, "doubleclick.com")
	|| dnsDomainIshost, "doubleclick.net")
	|| dnsDomainIshost, "dtscout.com")
	|| dnsDomainIshost, "dynalyst.jp")
	|| dnsDomainIshost, "eco-tag.jp")
	|| dnsDomainIshost, "emailretargeting.com")
	|| dnsDomainIshost, "emp.aiasahi.jp")
	|| dnsDomainIshost, "ero-advertising.com")
	|| dnsDomainIshost, "etc.atja.jp")
	|| dnsDomainIshost, "events.appsflyer.com")
	|| dnsDomainIshost, "exaf.jp")
	|| dnsDomainIshost, "exit-ad.com")
	|| dnsDomainIshost, "exoclick.com")
	|| dnsDomainIshost, "eyeota.net")
	|| dnsDomainIshost, "fam-ad.com")
	|| dnsDomainIshost, "fam-movie.com")
	|| dnsDomainIshost, "fancrew.jp")
	|| dnsDomainIshost, "feed.mikle.com")
	|| dnsDomainIshost, "fine-tv.net")
	|| dnsDomainIshost, "fivecdm.com")
	|| dnsDomainIshost, "fluct.jp")
	|| dnsDomainIshost, "flurry.com")
	|| dnsDomainIshost, "focas.jp")
	|| dnsDomainIshost, "for-ward.jp")
	|| dnsDomainIshost, "fout.jp")
	|| dnsDomainIshost, "fractionalmedia.com")
	|| dnsDomainIshost, "free-video-movie.com")
	|| dnsDomainIshost, "free2.jp")
	|| dnsDomainIshost, "fsitel.com")
	|| dnsDomainIshost, "gamefeat.net")
	|| dnsDomainIshost, "garss.tv")
	|| dnsDomainIshost, "gds786bomyc.com")
	|| dnsDomainIshost, "geniee.jp")
	|| dnsDomainIshost, "genieedmp.com")
	|| dnsDomainIshost, "genieesspv.jp")
	|| dnsDomainIshost, "gigazine.asia")
	|| dnsDomainIshost, "glam.com")
	|| dnsDomainIshost, "global.msmtrakk06d.com")
	|| dnsDomainIshost, "glossom.co.jp")
	|| dnsDomainIshost, "glossom.jp")
	|| dnsDomainIshost, "glssp.jp")
	|| dnsDomainIshost, "glssp.net")
	|| dnsDomainIshost, "gmossp-sp.jp")
	|| dnsDomainIshost, "go.ad1data.com")
	|| dnsDomainIshost, "go.megabanners.cf")
	|| dnsDomainIshost, "goodlifess.jp")
	|| dnsDomainIshost, "gravity.com")
	|| dnsDomainIshost, "gsspat.jp")
	|| dnsDomainIshost, "gsspcln.jp")
	|| dnsDomainIshost, "gssprt.jp")
	|| dnsDomainIshost, "guile.jp")
	|| dnsDomainIshost, "hihumi.biz")
	|| dnsDomainIshost, "hilltopads.net")
	|| dnsDomainIshost, "histats.com")
	|| dnsDomainIshost, "hitgraph.jp")
	|| dnsDomainIshost, "housead.xofapp.xyz")
	|| dnsDomainIshost, "href.asia")
	|| dnsDomainIshost, "i-generation.jp")
	|| dnsDomainIshost, "i-mobile.co.jp")
	|| dnsDomainIshost, "i.atleit.com")
	|| dnsDomainIshost, "i.image-ad.jp")
	|| dnsDomainIshost, "i.tapit.com")
	|| dnsDomainIshost, "i2ad.jp")
	|| dnsDomainIshost, "i2i.com")
	|| dnsDomainIshost, "i2i.jp")
	|| dnsDomainIshost, "i2idata.com")
	|| dnsDomainIshost, "i2iserv.com")
	|| dnsDomainIshost, "iadsdk.apple.com")
	|| dnsDomainIshost, "ichi-ni-san.net")
	|| dnsDomainIshost, "igp06.gameloft.com")
	|| dnsDomainIshost, "im-apps.net")
	|| dnsDomainIshost, "im.gmo.ov.yahoo.co.jp")
	|| dnsDomainIshost, "im.ov.yahoo.co.jp")
	|| dnsDomainIshost, "im.seesaa.ov.yahoo.co.jp")
	|| dnsDomainIshost, "image.d-064.com")
	|| dnsDomainIshost, "img.bbchat.tv")
	|| dnsDomainIshost, "img.mobee2.jp")
	|| dnsDomainIshost, "imgcdn01.formulas.jp")
	|| dnsDomainIshost, "in.treasuredata.com")
	|| dnsDomainIshost, "ingameads.gameloft.com")
	|| dnsDomainIshost, "ingameads2.gameloft.com")
	|| dnsDomainIshost, "ingamesads.gameloft.com")
	|| dnsDomainIshost, "ingest.crittercism.com")
	|| dnsDomainIshost, "inmobi-jp.com")
	|| dnsDomainIshost, "inmobi.com")
	|| dnsDomainIshost, "inmobisdk-a.akamaihd.net")
	|| dnsDomainIshost, "innovate-blog.info")
	|| dnsDomainIshost, "interstitial.fyber.com")
	|| dnsDomainIshost, "iogous.com")
	|| dnsDomainIshost, "iwanttodeliver.com")
	|| dnsDomainIshost, "j-a-net.jp")
	|| dnsDomainIshost, "j.gmodmp.jp")
	|| dnsDomainIshost, "j.image-ad.jp")
	|| dnsDomainIshost, "j.somewrite.jp")
	|| dnsDomainIshost, "j.zucks.net.zimg.jp")
	|| dnsDomainIshost, "j.zucks.net.zimg.jp.cdngc.net")
	|| dnsDomainIshost, "japanmetrix.jp")
	|| dnsDomainIshost, "jroqvbvw.info")
	|| dnsDomainIshost, "js.impact.ne.jp")
	|| dnsDomainIshost, "js.isboost.co.jp")
	|| dnsDomainIshost, "js.mediams.mb.softbank.jp")
	|| dnsDomainIshost, "js.monetize-ssp.com")
	|| dnsDomainIshost, "js.next-channel.com")
	|| dnsDomainIshost, "js.passaro-de-fogo.biz")
	|| dnsDomainIshost, "js.wizeraz.net")
	|| dnsDomainIshost, "jsccnn.com")
	|| dnsDomainIshost, "jscdndel.com")
	|| dnsDomainIshost, "jsecoin.com")
	|| dnsDomainIshost, "juicyads.com")
	|| dnsDomainIshost, "jyhfuqoh.info")
	|| dnsDomainIshost, "kau.li")
	|| dnsDomainIshost, "kdowqlpt.info")
	|| dnsDomainIshost, "ketchapp.org")
	|| dnsDomainIshost, "kiosked.com")
	|| dnsDomainIshost, "kochava.com")
	|| dnsDomainIshost, "koukoku.red")
	|| dnsDomainIshost, "krxd.net")
	|| dnsDomainIshost, "ktai.pw")
	|| dnsDomainIshost, "ladsp.com")
	|| dnsDomainIshost, "lead-ad.jp")
	|| dnsDomainIshost, "leadin.com")
	|| dnsDomainIshost, "leaffi.jp")
	|| dnsDomainIshost, "link-a.net")
	|| dnsDomainIshost, "linkshare.com")
	|| dnsDomainIshost, "linkshare.ne.jp")
	|| dnsDomainIshost, "listat.biz")
	|| dnsDomainIshost, "livead.jp")
	|| dnsDomainIshost, "liveads.jp")
	|| dnsDomainIshost, "livelog.biz")
	|| dnsDomainIshost, "lmodr.biz")
	|| dnsDomainIshost, "loading-delivery2.com")
	|| dnsDomainIshost, "log000.goo.ne.jp")
	|| dnsDomainIshost, "logly.co.jp")
	|| dnsDomainIshost, "lp.vasta.co.jp")
	|| dnsDomainIshost, "lululemonoutlets5online.info")
	|| dnsDomainIshost, "m-arata.com")
	|| dnsDomainIshost, "m.adsmatic.com")
	|| dnsDomainIshost, "ma-i2i.jp")
	|| dnsDomainIshost, "maad.maru.jp")
	|| dnsDomainIshost, "maist.jp")
	|| dnsDomainIshost, "mataharirama.xyz")
	|| dnsDomainIshost, "match.adsrvr.org")
	|| dnsDomainIshost, "mathtag.com")
	|| dnsDomainIshost, "mb-click.jp")
	|| dnsDomainIshost, "mdn2015x1.com")
	|| dnsDomainIshost, "mdpl-jp.com")
	|| dnsDomainIshost, "measure.ameblo.jp")
	|| dnsDomainIshost, "med.heyzap.com")
	|| dnsDomainIshost, "medi-8.net")
	|| dnsDomainIshost, "media-api.maio.jp")
	|| dnsDomainIshost, "media-b.jp")
	|| dnsDomainIshost, "media-rep.com")
	|| dnsDomainIshost, "media.fc2.com")
	|| dnsDomainIshost, "media.gssp.asia")
	|| dnsDomainIshost, "mediad.co.jp")
	|| dnsDomainIshost, "mediad2.jp")
	|| dnsDomainIshost, "mediaforge.com")
	|| dnsDomainIshost, "mediaid.click")
	|| dnsDomainIshost, "mediaweaver.jp")
	|| dnsDomainIshost, "medibaad.com")
	|| dnsDomainIshost, "metrics.mzstatic.com")
	|| dnsDomainIshost, "mgid.com")
	|| dnsDomainIshost, "microad.jp")
	|| dnsDomainIshost, "microad.net")
	|| dnsDomainIshost, "minemytraffic.com")
	|| dnsDomainIshost, "miner.pr0gramm.com")
	|| dnsDomainIshost, "minero-proxy-01.now.sh")
	|| dnsDomainIshost, "minero-proxy-02.now.sh")
	|| dnsDomainIshost, "minero-proxy-03.now.sh")
	|| dnsDomainIshost, "minero.pw")
	|| dnsDomainIshost, "misawa-antenna.link")
	|| dnsDomainIshost, "moatads.com")
	|| dnsDomainIshost, "mobylog.jp")
	|| dnsDomainIshost, "momoemoe.com")
	|| dnsDomainIshost, "moopoemoe.com")
	|| dnsDomainIshost, "monbran.net")
	|| dnsDomainIshost, "monerominer.rocks")
	|| dnsDomainIshost, "moras.jp")
	|| dnsDomainIshost, "mreco0.jp")
	|| dnsDomainIshost, "msg.simeji.baidu.jp")
	|| dnsDomainIshost, "mtburn.com")
	|| dnsDomainIshost, "mttag.com")
	|| dnsDomainIshost, "mucu.jp")
	|| dnsDomainIshost, "mycdn2.co")
	|| dnsDomainIshost, "n259adserv.com")
	|| dnsDomainIshost, "nend.net")
	|| dnsDomainIshost, "newrelic.com")
	|| dnsDomainIshost, "newzia.jp")
	|| dnsDomainIshost, "nex8.net")
	|| dnsDomainIshost, "nfdntqlqrgwc.com")
	|| dnsDomainIshost, "niconicoav.com")
	|| dnsDomainIshost, "nr-data.net")
	|| dnsDomainIshost, "nukiero.club")
	|| dnsDomainIshost, "oclaserver.com")
	|| dnsDomainIshost, "oct-pass.net")
	|| dnsDomainIshost, "octopuspop.com")
	|| dnsDomainIshost, "odnlj.snap-affairs.com")
	|| dnsDomainIshost, "omks.valuecommerce.com")
	|| dnsDomainIshost, "omotenashi.cygames.jp")
	|| dnsDomainIshost, "omt.shinobi.jp")
	|| dnsDomainIshost, "onclickads.net")
	|| dnsDomainIshost, "onclicktop.com")
	|| dnsDomainIshost, "onclkds.com")
	|| dnsDomainIshost, "online-dn.com")
	|| dnsDomainIshost, "open8.com")
	|| dnsDomainIshost, "open8video.blob.core.windows.net")
	|| dnsDomainIshost, "openx.net")
	|| dnsDomainIshost, "opr.formulas.jp")
	|| dnsDomainIshost, "orangemovie.link")
	|| dnsDomainIshost, "ot.ca-mpr.jp")
	|| dnsDomainIshost, "otaimg.com")
	|| dnsDomainIshost, "otapict.com")
	|| dnsDomainIshost, "outbrain.com")
	|| dnsDomainIshost, "overlay.top")
	|| dnsDomainIshost, "owldata.com")
	|| dnsDomainIshost, "p.rfihub.com")
	|| dnsDomainIshost, "pagead-googlehosted.l.google.com")
	|| dnsDomainIshost, "patiland.co")
	|| dnsDomainIshost, "permalink-system.com")
	|| dnsDomainIshost, "petametrics.com")
	|| dnsDomainIshost, "pixel.wp.com")
	|| dnsDomainIshost, "polymorphicads.jp")
	|| dnsDomainIshost, "popads.net")
	|| dnsDomainIshost, "api.popin.cc")
	|| dnsDomainIshost, "porno-tv.com")
	|| dnsDomainIshost, "poweredbyliquidfire.mobi")
	|| dnsDomainIshost, "ppgcm.profilepassport.jp")
	|| dnsDomainIshost, "ppoi.org")
	|| dnsDomainIshost, "preaf.jp")
	|| dnsDomainIshost, "primead.jp")
	|| dnsDomainIshost, "projectpoi.com")
	|| dnsDomainIshost, "proparm.jp")
	|| dnsDomainIshost, "prscripts.com")
	|| dnsDomainIshost, "ptengine.com")
	|| dnsDomainIshost, "ptengine.jp")
	|| dnsDomainIshost, "puhtml.com")
	|| dnsDomainIshost, "puserving.com")
	|| dnsDomainIshost, "push7.jp")
	|| dnsDomainIshost, "qe8dc4gw.com")
	|| dnsDomainIshost, "quant.jp")
	|| dnsDomainIshost, "quantcast.com")
	|| dnsDomainIshost, "quantserve.com")
	|| dnsDomainIshost, "r.edge.inmobicdn.com")
	|| dnsDomainIshost, "r.profilepassport.jp")
	|| dnsDomainIshost, "rayjump.com")
	|| dnsDomainIshost, "rcm.shinobi.jp")
	|| dnsDomainIshost, "rdp.pro.ne.jp")
	|| dnsDomainIshost, "reasedoper.pw")
	|| dnsDomainIshost, "red.hatena.ne.jp")
	|| dnsDomainIshost, "red.st-hatena.com")
	|| dnsDomainIshost, "red3.hatena.ne.jp")
	|| dnsDomainIshost, "redge-a.akamaihd.net")
	|| dnsDomainIshost, "reon.club")
	|| dnsDomainIshost, "reporo.net")
	|| dnsDomainIshost, "ressp.net")
	|| dnsDomainIshost, "revsci.net")
	|| dnsDomainIshost, "rihzsedipaqq.com")
	|| dnsDomainIshost, "rinad.jp")
	|| dnsDomainIshost, "rocks.io")
	|| dnsDomainIshost, "rokushiki.nefficient.jp")
	|| dnsDomainIshost, "rossoad.com")
	|| dnsDomainIshost, "rss-loader.com")
	|| dnsDomainIshost, "rtb.appintop.com")
	|| dnsDomainIshost, "rubiconproject.com")
	|| dnsDomainIshost, "s.pagoda56.com")
	|| dnsDomainIshost, "s0.2mdn.net")
	|| dnsDomainIshost, "s1.yicha.jp")
	|| dnsDomainIshost, "s3.mobile.val.jp")
	|| dnsDomainIshost, "san-ni-ichi.com")
	|| dnsDomainIshost, "sbs-ad.com")
	|| dnsDomainIshost, "schemouth.com")
	|| dnsDomainIshost, "sda.seesaa.jp")
	|| dnsDomainIshost, "searchteria.co.jp")
	|| dnsDomainIshost, "seedapp-creative.s3.amazonaws.com")
	|| dnsDomainIshost, "serve.richmediaads.com")
	|| dnsDomainIshost, "servedby.openxmarket.jp")
	|| dnsDomainIshost, "serving-sys.com")
	|| dnsDomainIshost, "sharethrough.com")
	|| dnsDomainIshost, "shisuh.com")
	|| dnsDomainIshost, "showads.pubmatic.com")
	|| dnsDomainIshost, "simplereach.com")
	|| dnsDomainIshost, "skimresources.com")
	|| dnsDomainIshost, "smaad.jp")
	|| dnsDomainIshost, "smac-ssp.com")
	|| dnsDomainIshost, "smart-ad.sakura.ne.jp")
	|| dnsDomainIshost, "smart-c.jp")
	|| dnsDomainIshost, "smartaccess.biz")
	|| dnsDomainIshost, "smartad-analytics.info")
	|| dnsDomainIshost, "smartads.mobile.yahoo.co.jp")
	|| dnsDomainIshost, "smartcanvas.net")
	|| dnsDomainIshost, "smartnews-ads.com")
	|| dnsDomainIshost, "socdm.com")
	|| dnsDomainIshost, "soma.smaato.net")
	|| dnsDomainIshost, "someapp.me")
	|| dnsDomainIshost, "soraad.jp")
	|| dnsDomainIshost, "sp-click2.jp")
	|| dnsDomainIshost, "sp.eroido.jp")
	|| dnsDomainIshost, "spacenine.biz")
	|| dnsDomainIshost, "spdeapp.com")
	|| dnsDomainIshost, "speead.jp")
	|| dnsDomainIshost, "speee-ad.akamaized.net")
	|| dnsDomainIshost, "spot-01.atas.io")
	|| dnsDomainIshost, "sprout-ad.com")
	|| dnsDomainIshost, "ssl-google-analytics.l.google.com")
	|| dnsDomainIshost, "sspintrafmsmt.com")
	|| dnsDomainIshost, "st.shinobi.jp")
	|| dnsDomainIshost, "stab.thench.net")
	|| dnsDomainIshost, "static.zucks.net.zimg.jp")
	|| dnsDomainIshost, "stats.unity3d.com")
	|| dnsDomainIshost, "stats.wordpress.com")
	|| dnsDomainIshost, "stats.wp.com")
	|| dnsDomainIshost, "statsp.fpop.net")
	|| dnsDomainIshost, "stimg.iand2ch.net")
	|| dnsDomainIshost, "stimg.thench.net")
	|| dnsDomainIshost, "stimgc.iand2ch.net")
	|| dnsDomainIshost, "stimgc.thench.net")
	|| dnsDomainIshost, "sumapo.org")
	|| dnsDomainIshost, "swcs.jp")
	|| dnsDomainIshost, "syaseigangan.club")
	|| dnsDomainIshost, "sync-tapi.admatrix.jp")
	|| dnsDomainIshost, "sync.shinobi.jp")
	|| dnsDomainIshost, "taboola.com")
	|| dnsDomainIshost, "tacoda.net")
	|| dnsDomainIshost, "tapjoyads.com")
	|| dnsDomainIshost, "tapone.jp")
	|| dnsDomainIshost, "taponejs-184e.kxcdn.com")
	|| dnsDomainIshost, "taxel.jp")
	|| dnsDomainIshost, "tcs-asp.net")
	|| dnsDomainIshost, "teads.tv")
	|| dnsDomainIshost, "techstats.net")
	|| dnsDomainIshost, "tm.r-ad.ne.jp")
	|| dnsDomainIshost, "tm2.r-ad.ne.jp")
	|| dnsDomainIshost, "trace.690.co")
	|| dnsDomainIshost, "tracer.jp")
	|| dnsDomainIshost, "track.appsflyer.com")
	|| dnsDomainIshost, "track.richmediaads.com")
	|| dnsDomainIshost, "track.somewrite.jp")
	|| dnsDomainIshost, "track.tenjin.io")
	|| dnsDomainIshost, "tracker.mca-analytics.com")
	|| dnsDomainIshost, "trackfeed.com")
	|| dnsDomainIshost, "trackword.net")
	|| dnsDomainIshost, "tradedoubler.com")
	|| dnsDomainIshost, "trafficfactory.biz")
	|| dnsDomainIshost, "traffichaus.com")
	|| dnsDomainIshost, "trafficjunky.net")
	|| dnsDomainIshost, "trafficstars.com")
	|| dnsDomainIshost, "trans-ad.jp")
	|| dnsDomainIshost, "trax-ad.jp")
	|| dnsDomainIshost, "turn.com")
	|| dnsDomainIshost, "umeng.com")
	|| dnsDomainIshost, "uncn.jp")
	|| dnsDomainIshost, "unitedblades.co.jp")
	|| dnsDomainIshost, "unitedblades.jp")
	|| dnsDomainIshost, "unityads.unity3d.com")
	|| dnsDomainIshost, "unthem.com")
	|| dnsDomainIshost, "user.in.net")
	|| dnsDomainIshost, "userdive.com")
	|| dnsDomainIshost, "v-wrd.com")
	|| dnsDomainIshost, "v2st.shinobi.jp")
	|| dnsDomainIshost, "vebadu.com")
	|| dnsDomainIshost, "vizury.com")
	|| dnsDomainIshost, "vungle.com")
	|| dnsDomainIshost, "webmasterjs.com")
	|| dnsDomainIshost, "webmine.cz")
	|| dnsDomainIshost, "webpush-cdn.mobify.net")
	|| dnsDomainIshost, "webtracker.jp")
	|| dnsDomainIshost, "webtrackerplus.com")
	|| dnsDomainIshost, "webtrendslive.com")
	|| dnsDomainIshost, "widget.iid-network.jp")
	|| dnsDomainIshost, "ww6z7lrg3a.top")
	|| dnsDomainIshost, "wwwpromoter.com")
	|| dnsDomainIshost, "x-lift.jp")
	|| dnsDomainIshost, "x3.shinobi.jp")
	|| dnsDomainIshost, "x8.sarashi.com")
	|| dnsDomainIshost, "x9.shinobi.jp")
	|| dnsDomainIshost, "xbasfbno.info")
	|| dnsDomainIshost, "xlisting.jp")
	|| dnsDomainIshost, "xlivedoor.com")
	|| dnsDomainIshost, "xseed-digital.jp")
	|| dnsDomainIshost, "xxlargepop.com")
	|| dnsDomainIshost, "yads.yahoo.co.jp")
	|| dnsDomainIshost, "yeas.yahoo.co.jp")
	|| dnsDomainIshost, "zbtqpkimkjcr.com")
	|| dnsDomainIshost, "zedo.com")
	|| dnsDomainIshost, "zemanta.com")
	|| dnsDomainIshost, "ziyu.net")
	|| dnsDomainIshost, "zmnqoymznwng.com")
	|| dnsDomainIshost, "zucks.net")
	|| dnsDomainIshost, "automoc.net")
	|| dnsDomainIshost, "mmaaxx.com")
	|| dnsDomainIshost, "ads.newsdigest.jp")
	|| dnsDomainIshost, "counter.monkeybanana2.com")
	|| dnsDomainIshost, "adsymptotic.com")
	|| dnsDomainIshost, "mxvp-ad-config-prod-1.zenmxapps.com")
	|| dnsDomainIshost, "mxvp-feature-toggle-prod-1.zenmxapps.com")
	|| dnsDomainIshost, "tracking-server-prod-1.zenmxapps.com")
	|| dnsDomainIshost, "pussl48.com")
	|| dnsDomainIshost, "s7.addthis.com")
	|| dnsDomainIshost, "sirokad.net")
	|| dnsDomainIshost, "umeng.co")
	|| dnsDomainIshost, "js.8-starssp.net")
	|| dnsDomainIshost, "bid.adpicker.net")
	|| dnsDomainIshost, "cdn.adpicker.net")
	|| dnsDomainIshost, "mmoframes.com")
	|| dnsDomainIshost, "cdn.bigmining.com")
	|| dnsDomainIshost, "deqwas-dsp.net")
	|| dnsDomainIshost, "deqwas.net")
	|| dnsDomainIshost, "cma.jword.jp")
	|| dnsDomainIshost, "aa.agkn.com")
	|| dnsDomainIshost, "d.agkn.com")
	|| dnsDomainIshost, "js.agkn.com")
	|| dnsDomainIshost, "www.agkn.com")
	|| dnsDomainIshost, "loadmill.com")
	|| dnsDomainIshost, "livelyoffers.club")
	|| dnsDomainIshost, "PopCash.com")
	|| dnsDomainIshost, "ads.altema.jp")
	|| dnsDomainIshost, "pascal5.science")
	|| dnsDomainIshost, "potedly.co")
	|| dnsDomainIshost, "hitcpm.com")
	|| dnsDomainIshost, "zenback.jp")
	|| dnsDomainIshost, "ad.886644.com")
	|| dnsDomainIshost, "adexchangeguru.com")
	|| dnsDomainIshost, "ylx-1.com")
	|| dnsDomainIshost, "tk.mobri.jp")
	|| dnsDomainIshost, "bannerbridge.net")
	|| dnsDomainIshost, "velocecdn.com")
	|| dnsDomainIshost, "counter.monkeybanana3.com")
	|| dnsDomainIshost, "ana2.tatsumi-sys.jp")
	|| dnsDomainIshost, "code.analysis.shinobi.jp")
	|| dnsDomainIshost, "analyzer.fc2.com")
	|| dnsDomainIshost, "analyzer2.fc2.com")
	|| dnsDomainIshost, "analyzer5.fc2.com")
	|| dnsDomainIshost, "analyzer51.fc2.com")
	|| dnsDomainIshost, "analyzer52.fc2.com")
	|| dnsDomainIshost, "analyzer53.fc2.com")
	|| dnsDomainIshost, "drkness.net")
	|| dnsDomainIshost, "imrworldwide.com")
	|| dnsDomainIshost, "ppc-direct.com")
	|| dnsDomainIshost, "asumi.shinobi.jp")
	|| dnsDomainIshost, "chikayo-dsp.shinobi.jp")
	|| dnsDomainIshost, "adc.shinobi.jp")
	|| dnsDomainIshost, "gad.shinobi.jp")
	|| dnsDomainIshost, "app-install-world.com")
	|| dnsDomainIshost, "moradu.com")
	|| dnsDomainIshost, "adw.addlv.smt.docomo.ne.jp")
	|| dnsDomainIshost, "s.pubmine.com")
	|| dnsDomainIshost, "s-adserver.cxad.cxense.com")
	|| dnsDomainIshost, "adservice.google.co.jp")
	|| dnsDomainIshost, "web.stati.bid")
	|| dnsDomainIshost, "preaf-ad.jp")
	|| dnsDomainIshost, "fam.dsdemo.jp")
	|| dnsDomainIshost, "applovin.com")
	|| dnsDomainIshost, "www3.smartadserver.com")
	|| dnsDomainIshost, "fem-staffservice.ssl-lolipop.jp")
	|| dnsDomainIshost, "public.fam-8.com")
	|| dnsDomainIshost, "cdn2.googlestatisticalserver.com")
	|| dnsDomainIshost, "rec1.smt.docomo.ne.jp")
	|| dnsDomainIshost, "adv.ad-splash.jp")
	|| dnsDomainIshost, "h.parrable.com")
	|| dnsDomainIshost, "cdn.lodeo.io")
	|| dnsDomainIshost, "ad.a-ads.com")
	|| dnsDomainIshost, "tags.h12-media.com")
	|| dnsDomainIshost, "ad.tokyo-tube-ad.com")
	|| dnsDomainIshost, "st.bebi.com")
	|| dnsDomainIshost, "go.bebi.com")
	|| dnsDomainIshost, "tsyndicate.com")
	|| dnsDomainIshost, "aoredi.com")
	|| dnsDomainIshost, "applvn.com")
	|| dnsDomainIshost, "onclickmega.com")
	|| dnsDomainIshost, "wa-track.com")
	|| dnsDomainIshost, "appier.net")
	|| dnsDomainIshost, "k77hof1z7k.com")
	|| dnsDomainIshost, "asset.adserver.vrizead.com")
	|| dnsDomainIshost, "iaflstore.jp")
	|| dnsDomainIshost, "js.gumgum.com")
	|| dnsDomainIshost, "g2.gumgum.com")
	|| dnsDomainIshost, "inter1ads.com")
	|| dnsDomainIshost, "adult.likevideo.jp")
	|| dnsDomainIshost, "api.repro.io")
	|| dnsDomainIshost, "t.appsflyer.com")
	|| dnsDomainIshost, "register.appsflyer.com")
	|| dnsDomainIshost, "attr.appsflyer.com")
	|| dnsDomainIshost, "bnserving.com")
	|| dnsDomainIshost, "video.unrulymedia.com")
	|| dnsDomainIshost, "manga.boy.jp")
	|| dnsDomainIshost, "next-channel.xyz")
	|| dnsDomainIshost, "banner.cybershop-affiliate.jp")
	|| dnsDomainIshost, "pfx.sma-clsystem.info")
	|| dnsDomainIshost, "effectivemeasure.net")
	|| dnsDomainIshost, "ad-nex.com")
	|| dnsDomainIshost, "d.image-ad.jp")
	|| dnsDomainIshost, "wearelovelive.com")
	|| dnsDomainIshost, "82b9d6273154e7cbf.com")
	|| dnsDomainIshost, "deloton.com")
	|| dnsDomainIshost, "mobpushup.com")
	|| dnsDomainIshost, "go.onclasrv.com")
	|| dnsDomainIshost, "go.mobisla.com")
	|| dnsDomainIshost, "trends.revcontent.com")
	|| dnsDomainIshost, "cobalten.com")
	|| dnsDomainIshost, "safe.urgent--alert.com")
	|| dnsDomainIshost, "play.entretenimientolz.com")
	|| dnsDomainIshost, "adferns.go2affise.com")
	|| dnsDomainIshost, "bannerfarm.aolp.jp")
	|| dnsDomainIshost, "advbanners.global.ssl.fastly.net")
	|| dnsDomainIshost, "my-softbank-jp.com ")
	|| dnsDomainIshost, "mysoftbank-jp.com ")
	|| dnsDomainIshost, "nttdocomo-service.com")
	|| dnsDomainIshost, "www.rakuten-contect-japan-servicc.com")
	|| dnsDomainIshost, "services-rakutencard.com")
	|| dnsDomainIshost, "cdn.adsafeprotected.com")
	|| dnsDomainIshost, "adztec.com")
	|| dnsDomainIshost, "googleadapis.l.google.com")
	|| dnsDomainIshost, "resultplus.jp")
	|| dnsDomainIshost, "ad.jognote.com")
	|| dnsDomainIshost, "fod-cm-ad-v.webcdn.stream.ne.jp")
	|| dnsDomainIshost, "js.ad-trive.jp")
	|| dnsDomainIshost, "n-ad.work")
	|| dnsDomainIshost, "ad.adpon.jp")
	|| dnsDomainIshost, "srv1.aaacompany.net")
	|| dnsDomainIshost, "gum.xbooks.to")
	|| dnsDomainIshost, "delivery.adrecover.com")
	|| dnsDomainIshost, "candy-network.com")
	|| dnsDomainIshost, "img-space.net")
	|| dnsDomainIshost, "lamp-shade.net")
	|| dnsDomainIshost, "liverail.com")
	|| dnsDomainIshost, "wisteria-js.excite.co.jp")
	|| dnsDomainIshost, "d1z2jf7jlzjs58.cloudfront.net")
	|| dnsDomainIshost, "imp.asahi.com")
	|| dnsDomainIshost, "advtrack.yicha.jp")
	|| dnsDomainIshost, "xa.shinobi.jp")
	|| dnsDomainIshost, "js.mulan.cloud")
	|| dnsDomainIshost, "xn--zuzy24d.co")
	|| dnsDomainIshost, "multiquicks.net")
	|| dnsDomainIshost, "ad.unispire.jp")
	|| dnsDomainIshost, "gstaticadssl.l.google.com")
	|| dnsDomainIshost, "analysiswebtool.com")
	|| dnsDomainIshost, "web-analysis.click")
	|| dnsDomainIshost, "js.bypass-sys.com")
	|| dnsDomainIshost, "mov-c.appli-info.com")
	|| dnsDomainIshost, "crosspartners.net")
	|| dnsDomainIshost, "code.orange-jelly.net")
	|| dnsDomainIshost, "static.ad-lancers.jp")
	|| dnsDomainIshost, "js.orca-pass.net")
	|| dnsDomainIshost, "count.orca-pass.net")
	|| dnsDomainIshost, "js-sec.indexww.com")
	|| dnsDomainIshost, "img.macromill.com")
	|| dnsDomainIshost, "whos.amung.us")
	|| dnsDomainIshost, "crosspromo.voodoo.io")
	|| dnsDomainIshost, "cdn.tynt.com")
	|| dnsDomainIshost, "ams900.goo.ne.jp")
	|| dnsDomainIshost, "rtb.nativeads.com")
	|| dnsDomainIshost, "get.mobu.jp")
	|| dnsDomainIshost, "ads-tr.bigmining.com")
	|| dnsDomainIshost, "sdk.ad.smaato.net")
	|| dnsDomainIshost, "adserver.cxad.cxense.com")
	|| dnsDomainIshost, "adprovider.maru.jp")
	|| dnsDomainIshost, "wt.adctrl.com")
	|| dnsDomainIshost, "ap-notify.bidagent.xad.com")
	|| dnsDomainIshost, "clicks.rtad.io")
	|| dnsDomainIshost, "f9uri.mymobilelead.com")
	|| dnsDomainIshost, "brucelead.com")
	|| dnsDomainIshost, "dt.adsafeprotected.com")
	|| dnsDomainIshost, "appollo-plus.com")
	|| dnsDomainIshost, "pixon.ads-pixiv.net")
	|| dnsDomainIshost, "bcloudhost.com")
	|| dnsDomainIshost, "ads280dummy2.com")
	|| dnsDomainIshost, "adaptv.advertising.com")
	|| dnsDomainIshost, "adtech.advertising.com")
	|| dnsDomainIshost, "nexage.advertising.com")
	|| dnsDomainIshost, "ads.stickyadstv.com")
	|| dnsDomainIshost, "dsp.adfarm1.adition.com")
	|| dnsDomainIshost, "adotmob.com")
	|| dnsDomainIshost, "cdn.neppa-ad.com")
	|| dnsDomainIshost, "fullrss.net")
	|| dnsDomainIshost, "rss.rssad.jp")
	|| dnsDomainIshost, "ads.mediams.mb.softbank.jp")
	|| dnsDomainIshost, "ad.abema.io")
	|| dnsDomainIshost, "reargooduches.pro")
	|| dnsDomainIshost, "pixel.parsely.com")
	|| dnsDomainIshost, "static.parsely.com")
	|| dnsDomainIshost, "solty.biz")
	|| dnsDomainIshost, "insight.adsrvr.org")
	|| dnsDomainIshost, "vidcpm.com")
	|| dnsDomainIshost, "evertherenous.info")
	|| dnsDomainIshost, "boudja.com")
	|| dnsDomainIshost, "ads.exdynsrv.com")
	|| dnsDomainIshost, "t.net-ap19.stream")
	|| dnsDomainIshost, "2016monclerselltokyo.net")
	|| dnsDomainIshost, "2017supremetokyo.com")
	|| dnsDomainIshost, "2017bootsjapan.com")
	|| dnsDomainIshost, "abc-adidas.com")
	|| dnsDomainIshost, "adidassneakersjapann.com")
	|| dnsDomainIshost, "aldantownwatch.com")
	|| dnsDomainIshost, "affordjabc.top")
	|| dnsDomainIshost, "acuio.org")
	|| dnsDomainIshost, "aquatas.com")
	|| dnsDomainIshost, "australiabootssalejp.com")
	|| dnsDomainIshost, "bag-hermes.com")
	|| dnsDomainIshost, "bagkakaku.com")
	|| dnsDomainIshost, "bagsyo.com")
	|| dnsDomainIshost, "bagshop78.com")
	|| dnsDomainIshost, "bellaveiskincare.com")
	|| dnsDomainIshost, "bestcopys.com")
	|| dnsDomainIshost, "birkin30.com")
	|| dnsDomainIshost, "boots1000.com")
	|| dnsDomainIshost, "brandcopy2016.com")
	|| dnsDomainIshost, "brandedcorner.com")
	|| dnsDomainIshost, "brandheya.com")
	|| dnsDomainIshost, "brandparis6.com")
	|| dnsDomainIshost, "breeree.com")
	|| dnsDomainIshost, "burandsale.com")
	|| dnsDomainIshost, "buyma.site")
	|| dnsDomainIshost, "buytowe.com")
	|| dnsDomainIshost, "bvlgarijapan.com")
	|| dnsDomainIshost, "c-web.biz")
	|| dnsDomainIshost, "camstaterep.com")
	|| dnsDomainIshost, "caycecole.com")
	|| dnsDomainIshost, "celine-japan.com")
	|| dnsDomainIshost, "chez-lai.com")
	|| dnsDomainIshost, "chibauni.com")
	|| dnsDomainIshost, "ciltbakimiveguzellik.com")
	|| dnsDomainIshost, "clinexcel.com")
	|| dnsDomainIshost, "coach-japan.com")
	|| dnsDomainIshost, "coatnihon.com")
	|| dnsDomainIshost, "coolkaba.com")
	|| dnsDomainIshost, "ctibrc.org")
	|| dnsDomainIshost, "cynergyper4mers.com")
	|| dnsDomainIshost, "deborahcoelho.com")
	|| dnsDomainIshost, "dgauda.com")
	|| dnsDomainIshost, "dinermuseum.com")
	|| dnsDomainIshost, "diogene99.com")
	|| dnsDomainIshost, "darknagar.ru")
	|| dnsDomainIshost, "dokei777.com")
	|| dnsDomainIshost, "dragontechs.com")
	|| dnsDomainIshost, "edu-huayu.com")
	|| dnsDomainIshost, "enlvs.com")
	|| dnsDomainIshost, "eurocentrichandbags.com")
	|| dnsDomainIshost, "evelynswonderland.com")
	|| dnsDomainIshost, "flagshipband.com")
	|| dnsDomainIshost, "flighttocapetown.com")
	|| dnsDomainIshost, "genuinelouisvuitton.com")
	|| dnsDomainIshost, "gardeningst.men")
	|| dnsDomainIshost, "gobuy678.com")
	|| dnsDomainIshost, "grvspn.com")
	|| dnsDomainIshost, "guccimenjpsale.com")
	|| dnsDomainIshost, "gutebaby.com")
	|| dnsDomainIshost, "grangehillsurgery.co.uk")
	|| dnsDomainIshost, "hermesmax.com")
	|| dnsDomainIshost, "hamalibg.biz")
	|| dnsDomainIshost, "hostalelcandil.com")
	|| dnsDomainIshost, "hicopys.net")
	|| dnsDomainIshost, "i-you-i.com")
	|| dnsDomainIshost, "icoolauto.com")
	|| dnsDomainIshost, "ilvjp.com")
	|| dnsDomainIshost, "iphoneswitch.com")
	|| dnsDomainIshost, "j5sf.com")
	|| dnsDomainIshost, "japanshopstyle.com")
	|| dnsDomainIshost, "jennus.com")
	|| dnsDomainIshost, "jfashop.net")
	|| dnsDomainIshost, "jilliancamwell.com")
	|| dnsDomainIshost, "jjkopi.com")
	|| dnsDomainIshost, "jleagueshop.com")
	|| dnsDomainIshost, "jonpoor.com")
	|| dnsDomainIshost, "jleagueuniform.com")
	|| dnsDomainIshost, "jpbands2020.com")
	|| dnsDomainIshost, "kakabrands.org")
	|| dnsDomainIshost, "kankokukopi.com")
	|| dnsDomainIshost, "kikuku.net")
	|| dnsDomainIshost, "komostyle.com")
	|| dnsDomainIshost, "kokokujp.top")
	|| dnsDomainIshost, "kushyma.com")
	|| dnsDomainIshost, "lafondabr.com")
	|| dnsDomainIshost, "likekopi.com")
	|| dnsDomainIshost, "lkjy.net")
	|| dnsDomainIshost, "longchampukhandbags.com")
	|| dnsDomainIshost, "louis-360.com")
	|| dnsDomainIshost, "laptopscreen.jp")
	|| dnsDomainIshost, "louisale.store")
	|| dnsDomainIshost, "moncler.onlineshop.jp.net")
	|| dnsDomainIshost, "lux-gokujo.com")
	|| dnsDomainIshost, "lv-guccl88.com")
	|| dnsDomainIshost, "lvbagonsale.com")
	|| dnsDomainIshost, "lveif.com")
	|| dnsDomainIshost, "lvk7.com")
	|| dnsDomainIshost, "lvnkad.com")
	|| dnsDomainIshost, "lvreig.net")
	|| dnsDomainIshost, "m1700.com")
	|| dnsDomainIshost, "maikiki.com")
	|| dnsDomainIshost, "mamairma.info")
	|| dnsDomainIshost, "man-live.ru")
	|| dnsDomainIshost, "methuenrestaurantweek.com")
	|| dnsDomainIshost, "mikopi.com")
	|| dnsDomainIshost, "mjjbag78.com")
	|| dnsDomainIshost, "mobydickgozo.com")
	|| dnsDomainIshost, "momocak.com")
	|| dnsDomainIshost, "man-live.co")
	|| dnsDomainIshost, "monclerdown2014.com")
	|| dnsDomainIshost, "mortchiropractic.com")
	|| dnsDomainIshost, "msaletoo.com")
	|| dnsDomainIshost, "mvpnba.com")
	|| dnsDomainIshost, "mybgbgclojp.com")
	|| dnsDomainIshost, "newyorksportsworld.com")
	|| dnsDomainIshost, "nrelievedbrand.com")
	|| dnsDomainIshost, "nutrired.org")
	|| dnsDomainIshost, "officehelptogo.com")
	|| dnsDomainIshost, "ok-outlet.com")
	|| dnsDomainIshost, "oneminuteplayfestival.org")
	|| dnsDomainIshost, "northlandtimeshares.com")
	|| dnsDomainIshost, "onyxalliance.org")
	|| dnsDomainIshost, "osakadepo.com")
	|| dnsDomainIshost, "nmejrb.com")
	|| dnsDomainIshost, "outtogetme.com")
	|| dnsDomainIshost, "ozkaltd.com")
	|| dnsDomainIshost, "palazzogrimani.org")
	|| dnsDomainIshost, "peppertreefrosty.com")
	|| dnsDomainIshost, "pickgolfup.com")
	|| dnsDomainIshost, "pszsri.com")
	|| dnsDomainIshost, "pumashopjapan.com")
	|| dnsDomainIshost, "positiveedgetutoring.co.uk")
	|| dnsDomainIshost, "rakkuten.space")
	|| dnsDomainIshost, "renewingfaces.com")
	|| dnsDomainIshost, "repurikakamire.com")
	|| dnsDomainIshost, "robertsguide.com")
	|| dnsDomainIshost, "rodrigoeberienos.com")
	|| dnsDomainIshost, "rushmyrepair.com")
	|| dnsDomainIshost, "saifudesigner.com")
	|| dnsDomainIshost, "sakuraboxs.com")
	|| dnsDomainIshost, "sale8899.com")
	|| dnsDomainIshost, "sales-bicyclewebstore.top")
	|| dnsDomainIshost, "shoeswars.com")
	|| dnsDomainIshost, "shop-sis.com")
	|| dnsDomainIshost, "sakuraset.top")
	|| dnsDomainIshost, "smetn.com")
	|| dnsDomainIshost, "sneakerheadclub.com")
	|| dnsDomainIshost, "sneakersjapanu.com")
	|| dnsDomainIshost, "snicases.com")
	|| dnsDomainIshost, "speeddtc.com")
	|| dnsDomainIshost, "sportscatchup.com")
	|| dnsDomainIshost, "sportseve.com")
	|| dnsDomainIshost, "steadypaddling.com")
	|| dnsDomainIshost, "storecor.net")
	|| dnsDomainIshost, "styleja.com")
	|| dnsDomainIshost, "stylesfashionstore.com")
	|| dnsDomainIshost, "teddyni.com")
	|| dnsDomainIshost, "top-kopi.net")
	|| dnsDomainIshost, "toryburchoutlet.info")
	|| dnsDomainIshost, "uggbootsjapan.net")
	|| dnsDomainIshost, "unifomushop.com")
	|| dnsDomainIshost, "uniform-fc.com")
	|| dnsDomainIshost, "urbntouch.com")
	|| dnsDomainIshost, "vanlai.com")
	|| dnsDomainIshost, "vuitton-love.com")
	|| dnsDomainIshost, "variedshops.men")
	|| dnsDomainIshost, "vuittonfans.com")
	|| dnsDomainIshost, "vuittonu.com")
	|| dnsDomainIshost, "watch9.com")
	|| dnsDomainIshost, "yahhooo.net")
	|| dnsDomainIshost, "youthrenewphyto.com")
	|| dnsDomainIshost, "ysloutletbags.com")
	|| dnsDomainIshost, "yuibo.com")
	|| dnsDomainIshost, "ad.ddo.jp")
	|| dnsDomainIshost, "localytics.com")
	|| dnsDomainIshost, "n.pc1ads.com")
	|| dnsDomainIshost, "ads.admarvel.com")
	|| dnsDomainIshost, "ads.servebom.com")
	|| dnsDomainIshost, "baseballkathyy.ml")
	|| dnsDomainIshost, "xmax.jp")
	|| dnsDomainIshost, "lpdk.net")
	|| dnsDomainIshost, "osiete-k.com")
	|| dnsDomainIshost, "feed.mobeek.net")
	|| dnsDomainIshost, "l.betrad.com")
	|| dnsDomainIshost, "c.betrad.com")
	|| dnsDomainIshost, "cf.xad.com")
	|| dnsDomainIshost, "click.speee-ad.jp")
	|| dnsDomainIshost, "spotx.tv")
	|| dnsDomainIshost, "spotxchange-a.akamaihd.net")
	|| dnsDomainIshost, "stats.atrl.co")
	|| dnsDomainIshost, "cdn.connectad.io")
	|| dnsDomainIshost, "i.connectad.io")
	|| dnsDomainIshost, "vi-serve.com")
	|| dnsDomainIshost, "intertakekuhy.info")
	|| dnsDomainIshost, "ads.yahoo.com")
	|| dnsDomainIshost, "cf04.kanade-ad.net")
	|| dnsDomainIshost, "asia.creativecdn.com")
	|| dnsDomainIshost, "sin.creativecdn.com")
	|| dnsDomainIshost, "pixel.tapad.com")
	|| dnsDomainIshost, "sync.aralego.com")
	|| dnsDomainIshost, "eb2.3lift.com")
	|| dnsDomainIshost, "logv2.r-oo.jp")
	|| dnsDomainIshost, "trj.valuecommerce.com")
	|| dnsDomainIshost, "img.aread.site")
	|| dnsDomainIshost, "nornelis.pw")
	|| dnsDomainIshost, "analytics.grupogodo.com")
	|| dnsDomainIshost, "anonymousdemographics.com")
	|| dnsDomainIshost, "bidgear.com")
	|| dnsDomainIshost, "i.popincdn.com")
	|| dnsDomainIshost, "js.batis.vip")
	|| dnsDomainIshost, "x-storage-a1.cir.io")
	|| dnsDomainIshost, "2lwlh385os.com")
	|| dnsDomainIshost, "ca.clcknads.pro")
	|| dnsDomainIshost, "aphookkensidah.pro")
	|| dnsDomainIshost, "spot-01.trackingpro.pro")
	|| dnsDomainIshost, "srv.bebi.com")
	|| dnsDomainIshost, "s3.buysellads.com")
	|| dnsDomainIshost, "adxxx.me")
	|| dnsDomainIshost, "fingahvf.top")
	|| dnsDomainIshost, "6ped2nd3yp.com")
	|| dnsDomainIshost, "smopy.com")
	|| dnsDomainIshost, "adtrue.com")
	|| dnsDomainIshost, "d2swpuhpwp3khd.cloudfront.net")
	|| dnsDomainIshost, "nxcount.com")
	|| dnsDomainIshost, "crwdcntrl.net")
	|| dnsDomainIshost, "mahimeta.com")
	|| dnsDomainIshost, "aniview.com")
	|| dnsDomainIshost, "run-syndicate.com")
	|| dnsDomainIshost, "bdv.bidvertiser.com")
	|| dnsDomainIshost, "pushance.com")
	|| dnsDomainIshost, "tharbadir.com")
	|| dnsDomainIshost, "go.oclasrv.com")
	|| dnsDomainIshost, "js.winc-ad.com")
	|| dnsDomainIshost, "fam-8.net")
	|| dnsDomainIshost, "ad.rarure.com")
	|| dnsDomainIshost, "s.storage-ad.com")
	|| dnsDomainIshost, "dis.hogei.info")
	|| dnsDomainIshost, "pr.hogei.info")
	|| dnsDomainIshost, "ads.mulan.cloud")
	|| dnsDomainIshost, "line-cross.com")
	|| dnsDomainIshost, "invocation.cheqzone.com")
	|| dnsDomainIshost, "trc.pitadtag.jp")
	|| dnsDomainIshost, "abema-adx.ameba.jp")
	|| dnsDomainIshost, "js.rush-member.com")
	|| dnsDomainIshost, "supersonicads.com")
	|| dnsDomainIshost, "tapjoy.com")
	|| dnsDomainIshost, "cdn-api.admost.com")
	|| dnsDomainIshost, "med-api.admost.com")
	|| dnsDomainIshost, "sdk.adtiming.com")
	|| dnsDomainIshost, "supersonicads-a.akamaihd.net")
	|| dnsDomainIshost, "logs.supersonic.com")
	|| dnsDomainIshost, "goliath.bi.miniclippt.com")
	|| dnsDomainIshost, "smartadserver.com")
	|| dnsDomainIshost, "addelivery-engine-api.voodoo-ads.io")
	|| dnsDomainIshost, "front-logs.voodoo-ads.io")
	|| dnsDomainIshost, "live.chartboost.com")
	|| dnsDomainIshost, "sdk.adincube.com")
	|| dnsDomainIshost, "ads.bulldogcpi.com")
	|| dnsDomainIshost, "ads.chartboosts.com")
	|| dnsDomainIshost, "impression.appsflyer.com")
	|| dnsDomainIshost, "trackers.voodoo-analytics.io")
	|| dnsDomainIshost, "ad.2ch.live")
	|| dnsDomainIshost, "log.pinterest.com")
	|| dnsDomainIshost, "api.adsnative.com")
	|| dnsDomainIshost, "api.adxcorp.kr")
	|| dnsDomainIshost, "js-sdk-crossmedia.ec-concier.com")
	|| dnsDomainIshost, "newmayads.com")
	|| dnsDomainIshost, "seaofads.com")
	|| dnsDomainIshost, "onclicksuper.com")
	|| dnsDomainIshost, "ie8eamus.com")
	|| dnsDomainIshost, "carbonads.com")
	|| dnsDomainIshost, "ads.aerserv.com")
	|| dnsDomainIshost, "textad.net")
	|| dnsDomainIshost, "optad360.io")
	|| dnsDomainIshost, "nt.compass-fit.jp")
	|| dnsDomainIshost, "rs917bem.com")
	|| dnsDomainIshost, "nn3h953s.com")
	|| dnsDomainIshost, "native.propellerads.com")
	|| dnsDomainIshost, "vpn1service.com")
	|| dnsDomainIshost, "promo.verajohn.com")
	|| dnsDomainIshost, "bestlandcn.com")
	|| dnsDomainIshost, "alxc.addlv.smt.docomo.ne.jp")
	|| dnsDomainIshost, "s-onetag.com")
	|| dnsDomainIshost, "analytics.yahoo.com")
	|| dnsDomainIshost, "geo.yahoo.com")
	|| dnsDomainIshost, "prism.pandora.tv")
	|| dnsDomainIshost, "cdnprism.pandora.tv")
	|| dnsDomainIshost, "demand.supply")
	|| dnsDomainIshost, "xgrwjbui.top")
	|| dnsDomainIshost, "s24hc8xzag.com")
	|| dnsDomainIshost, "adtng.com")
	|| dnsDomainIshost, "advimg.ad-mapps.com")
	|| dnsDomainIshost, "hyperpromote.com")
	|| dnsDomainIshost, "spotxchange.com")
	|| dnsDomainIshost, "intergi.com")
	|| dnsDomainIshost, "steepto.com")
	|| dnsDomainIshost, "io.narrative.io")
	|| dnsDomainIshost, "pippio.com")
	|| dnsDomainIshost, "deloplen.com")
	|| dnsDomainIshost, "infolinks.com")
	|| dnsDomainIshost, "torimochi-ad.net")
	|| dnsDomainIshost, "propellerclick.com")
	|| dnsDomainIshost, "statsforads.com")
	|| dnsDomainIshost, "reajyu.net")
	|| dnsDomainIshost, "api.kaiu-marketing.com")
	|| dnsDomainIshost, "googleadservices.com")
	|| dnsDomainIshost, "trafficgate.net")
	|| dnsDomainIshost, "nakanohito.jp")
	//
	// banner servers
	// (typically these set cookies or serve animated ads)
	//

	|| dnsDomainIs(host, "commonwealth.riddler.com")
	|| dnsDomainIs(host, "banner.freeservers.com")
	|| dnsDomainIs(host, "usads.futurenet.com")
	|| dnsDomainIs(host, "banners.egroups.com")
	|| dnsDomainIs(host, "ngadclient.hearme.com")
	|| dnsDomainIs(host, "affiliates.allposters.com")
	|| dnsDomainIs(host, "adincl.go2net.com")
	|| dnsDomainIs(host, "webads.bizservers.com")
	|| dnsDomainIs(host, ".addserv.com")
	|| dnsDomainIs(host, ".falkag.net")
	|| dnsDomainIs(host, ".buysellads.com")
	|| dnsDomainIs(host, ".dtscout.com")
	|| dnsDomainIs(host, ".tynt.com")

	|| (host == "promote.pair.com")

	|| dnsDomainIs(host, ".interclick.com")
	|| dnsDomainIs(host, ".travelscream.com")

	// marketwatch.com (flash ads), but CSS get loaded
	|| (dnsDomainIs(host, ".mktw.net")
	    && !shExpMatch(url, "*/css/*"))
	|| dnsDomainIs(host, ".cjt1.net")
	|| dnsDomainIs(host, ".bns1.net")
	
	// "undergroundonline"
	// comes from iframe with this url: http://mediamgr.ugo.com/html.ng/size=728x90&affiliate=megagames&channel=games&subchannel=pc&Network=affiliates&rating=g
	|| dnsDomainIs(host, "image.ugo.com")
	|| dnsDomainIs(host, "mediamgr.ugo.com")

	// web ads and "cheap Long Distance"
	|| dnsDomainIs(host, "zonecms.com")
	|| dnsDomainIs(host, "zoneld.com")

	// AOL
	|| dnsDomainIs(host, ".atwola.com")
	|| dnsDomainIs(host, "toolbar.aol.com")
	|| dnsDomainIs(host, ".adsdk.com")

	// animated ads shown at techbargains
	|| (dnsDomainIs(host, ".overstock.com")
	    && shExpMatch(url, "*/linkshare/*"))
	|| (dnsDomainIs(host, ".supermediastore.com")
	    && shExpMatch(url, "*/lib/supermediastore/*"))
	|| (dnsDomainIs(host, ".shop4tech.com")
	    && shExpMatch(url, "*/assets/*"))
	|| (dnsDomainIs(host, ".softwareandstuff.com")
	    && shExpMatch(url, "*/media/*"))
	|| (dnsDomainIs(host, ".buy.com")
	    && shExpMatch(url, "*/affiliate/*"))

	|| (dnsDomainIs(host, "pdaphonehome.com")
	    && (shExpMatch(url, "*/pocketpcmagbest.gif")
		|| shExpMatch(url, "*/link-msmobiles.gif")))
	|| (dnsDomainIs(host, "ppc4you.com")
	    && shExpMatch(url, "*/ppc_top_sites.gif"))

	// more animated ads... these really drive me crazy
	|| (dnsDomainIs(host, ".freewarepalm.com")
	    && shExpMatch(url, "*/sponsors/*"))

	|| dnsDomainIs(host, "travelscream.com")
	|| dnsDomainIs(host, "traveldeals.com")
	|| dnsDomainIs(host, "traveldeals.wunderground.com")
	|| dnsDomainIs(host, "as5000.com")

	//////
	//
	// Ads/noise that make web pages SLOW
	//

	|| (dnsDomainIs(host, "mc.dailymotion.com")
	    && shExpMatch(url, "*/masscast/*"))

	// "widget" at RottenTomatoes (provided by 'thespringbox')
	// **maybe just use 'flashblock' everywhere**
	|| (host == "downloads.thespringbox.com"
	   // uncomment this to be more targeted and just remove the one at RT
	   // && shEXpMatch(url, "*/wrapper.php?file=51832.sbw")
	)

	// "You May Also Like"
	|| dnsDomainIs(host, "outbrain.com")
	
	// annoying "promoted content"
	|| dnsDomainIs(host, "marketgid.com")
	|| dnsDomainIs(host, "mgid.com")

	|| dnsDomainIs(host, "rtbsystem.com")

	|| dnsDomainIs(host, "directrev.com")
	|| dnsDomainIs(host, "az708531.vo.msecnd.net")

	//////
	//
	// popups/unders
	//

	|| dnsDomainIs(host, "remotead.cnet.com")
	|| dnsDomainIs(host, ".1st-dating.com")
	|| dnsDomainIs(host, ".mousebucks.com")
	|| dnsDomainIs(host, ".yourfreedvds.com")
	|| dnsDomainIs(host, ".popupsavings.com")
	|| dnsDomainIs(host, ".popupmoney.com")
	|| dnsDomainIs(host, ".popuptraffic.com")
	|| dnsDomainIs(host, ".popupnation.com")
	|| dnsDomainIs(host, ".infostart.com")
	|| dnsDomainIs(host, ".popupad.net")
	|| dnsDomainIs(host, ".usapromotravel.com")
	|| dnsDomainIs(host, ".goclick.com")
	|| dnsDomainIs(host, ".trafficwave.net")
	|| dnsDomainIs(host, ".popupad.net")
	|| dnsDomainIs(host, ".paypopup.com")

	// adsterra
	|| dnsDomainIs(host, ".vipcpms.com")
	|| dnsDomainIs(host, ".putags.com")

	// Popups from ezboard
	|| dnsDomainIs(host, ".greenreaper.com")
	|| dnsDomainIs(host, ".spewey.com")
	|| dnsDomainIs(host, ".englishharbour.com")
	|| dnsDomainIs(host, ".casino-trade.com")
	|| dnsDomainIs(host, "got2goshop.com")
	// more ezboard crud (from Miika Asunta)
	|| dnsDomainIs(host, ".addynamix.com")
	|| dnsDomainIs(host, ".trafficmp.com")
	|| dnsDomainIs(host, ".makingmoneyfromhome.net")
	|| dnsDomainIs(host, ".leadcart.com")

	|| dnsDomainIs(host, "euros4click.de")

	// http://www.power-mark.com/js/popunder.js
	|| dnsDomainIs(host, ".power-mark.com")

	//////
	//
	// User tracking (worse than ads) && hit counting "services"
	//

	// "web trends live"
	|| dnsDomainIs(host, ".webtrendslive.com")
	|| dnsDomainIs(host, ".wtlive.com")
	|| dnsDomainIs(host, ".imrworldwide.com")

	// 1x1 tracking images
	// ** (but also used in some pay-for-clicks that I want to follow,
	// **  so disabled for now.  9/2001)
	// || dnsDomainIs(host, "service.bfast.com")

	// one whole class C full of ad servers
	// XXX this might need the resolver
//	|| isInNet(host, "66.40.16.0", "255.255.255.0")
	|| shExpMatch(host, "66.40.16.*")

	|| dnsDomainIs(host, ".web-stat.com")
	|| dnsDomainIs(host, ".superstats.com")
	|| dnsDomainIs(host, ".allhits.ru")
	|| dnsDomainIs(host, ".list.ru")
	|| dnsDomainIs(host, ".counted.com")
	|| dnsDomainIs(host, ".rankyou.com")
	|| dnsDomainIs(host, ".clickcash.com")
	|| dnsDomainIs(host, ".clickbank.com")
	|| dnsDomainIs(host, ".paycounter.com")
	|| dnsDomainIs(host, ".cashcount.com")
	|| dnsDomainIs(host, ".clickedyclick.com")
	|| dnsDomainIs(host, ".clickxchange.com")
	|| dnsDomainIs(host, ".sitestats.com")
	|| dnsDomainIs(host, ".site-stats.com")
	|| dnsDomainIs(host, ".hitbox.com")
	|| dnsDomainIs(host, ".exitdirect.com")
	|| dnsDomainIs(host, ".realtracker.com")
	|| dnsDomainIs(host, ".etracking.com")
	|| dnsDomainIs(host, ".livestat.com")
	|| dnsDomainIs(host, ".spylog.com")
	|| dnsDomainIs(host, ".freestats.com")
	|| dnsDomainIs(host, ".addfreestats.com")
	|| dnsDomainIs(host, ".topclicks.net")
	|| dnsDomainIs(host, ".mystat.pl")
	|| dnsDomainIs(host, ".hitz4you.de")
	|| dnsDomainIs(host, ".hitslink.com")
	|| dnsDomainIs(host, ".thecounter.com")
	|| dnsDomainIs(host, ".roiservice.com")
	|| dnsDomainIs(host, ".overture.com")
	|| dnsDomainIs(host, ".xiti.com")
	|| dnsDomainIs(host, ".cj.com")
	|| dnsDomainIs(host, ".anrdoezrs.net")
	|| dnsDomainIs(host, ".hey.it")
	|| dnsDomainIs(host, ".ppctracking.net")
	|| dnsDomainIs(host, ".darkcounter.com")
	|| dnsDomainIs(host, ".2o7.com")
	|| dnsDomainIs(host, ".2o7.net")
	|| dnsDomainIs(host, ".gostats.com")
	|| dnsDomainIs(host, ".everstats.com")
	|| dnsDomainIs(host, ".onestat.com")
	|| dnsDomainIs(host, ".statcounter.com")
	|| dnsDomainIs(host, ".trafic.ro")
	|| dnsDomainIs(host, ".exitexchange.com")
	|| dnsDomainIs(host, "clicktorrent.info")
	|| dnsDomainIs(host, "ventimedia.com")
	|| dnsDomainIs(host, "flashmediaportal.com")

	// clickability, via CNN
	|| dnsDomainIs(host, ".clickability.com")
	|| dnsDomainIs(host, ".savethis.com")

	|| dnsDomainIs(host, ".extremetracking.com")
	|| dnsDomainIs(host, ".extreme-dm.com")
	|| dnsDomainIs(host, ".pop6.com")
	|| dnsDomainIs(host, ".medleyads.com")

	// bogus 'news'
	|| dnsDomainIs(host, "news6insider.com")

	// bogus 'virusscan' popup/hijack
	// antivirus-whitelist.cw.cm
	// redirected from zyvqerta.cw.cm
	// redirected from contmoovui4d.co.cc 
	// (I'm tempted to toss all these bogus TLDs in the trash,
	// but I'll just stay on the second level)
	|| dnsDomainIs(host, "cw.cm")
	|| dnsDomainIs(host, "co.cc")

	|| dnsDomainIs(host, "hideus.in")
	|| dnsDomainIs(host, "addthis.com")
	|| dnsDomainIs(host, "popadscdn.net")

	//////
	//
	// Dead domain parking
	//
	|| dnsDomainIs(host, ".netster.com")

	//////
	//
	// Search engine "optimizers"
	//
	|| dnsDomainIs(host, ".searchmarketing.com")

	//////
	//
	// Spyware/worms
	//

	|| dnsDomainIs(host, ".friendgreetings.com")
	|| dnsDomainIs(host, ".permissionedmedia.com")
	|| dnsDomainIs(host, ".searchbarcash.com")

	//////
	//
	// Surveys, votes, quizes
	//

	|| dnsDomainIs(host, ".zoomerang.com")
	|| dnsDomainIs(host, ".quizrocket.com")
	|| (dnsDomainIs(host, ".amazonaws.com")
	    && shExpMatch(url, "*/udm_img/mid*")
	)

	//////
	//
	// "Casino" ads (scams)
	//

	|| dnsDomainIs(host, ".aceshigh.com")
	|| dnsDomainIs(host, ".idealcasino.net")
	|| dnsDomainIs(host, ".casinobar.net")
	|| dnsDomainIs(host, ".casinoionair.com")

	|| (dnsDomainIs(host, ".go2net.com")
	    && shExpMatch(url, "*adclick*")
	)

	//////
	//
	// Spammers
	//

	|| dnsDomainIs(host, ".licensed-collectibles.com")
	|| dnsDomainIs(host, ".webdesignprofessional.com")

	//////
	//
	// Directed at extra annoying places
	//

	// Attempts to download ad-supported spyware without asking first
	|| dnsDomainIs(host, ".gator.com")

	// ebay
	|| ((dnsDomainIs(host, "pics.ebay.com")
	     || dnsDomainIs(host, "pics.ebaystatic.com"))
	    && shExpMatch(url, "*/pics/mops/*/*[0-9]x[0-9]*")
	)
	|| (dnsDomainIs(host, "ebayobjects.com")
	    && shExpMatch(url, "*search/keywords*")
	)
	|| dnsDomainIs(host, "admarketplace.com")
	|| dnsDomainIs(host, "admarketplace.net")

	// Bravenet & Ezboard
	|| (dnsDomainIs(host, ".ezboard.com")
	    && shExpMatch(url, "*/bravenet/*")
	)
	|| (dnsDomainIs(host, ".bravenet.com")
	    && (   shExpMatch(host, "*counter*")
		|| shExpMatch(url, "*/jsbanner*")
	        || shExpMatch(url, "*/bravenet/*")
	    )
	)

	// GeoCities
	// (checking "toto" from Prakash Persaud)
	|| ((   dnsDomainIs(host,"geo.yahoo.com")
	     || dnsDomainIs(host,".geocities.com"))
	    && (
		   shExpMatch(url,"*/toto?s*")
		|| shExpMatch(url, "*geocities.com/js_source*")
		|| dnsDomainIs(host, "visit.geocities.com")
	    )
	)

	// Yahoo ads (direct and via Akamai)
	// http://us.a1.yimg.com/us.yimg.com/a/...
	|| (dnsDomainIs(host,"yimg.com")
	    && !(   shExpMatch(url,"*yimg.com/a/i/*")
		 || shExpMatch(url,"*yimg.com/a/lib/*")
		 || shExpMatch(url,"*yimg.com/a/combo*")
	    )
	    && (   shExpMatch(url,"*yimg.com/a/*")
		|| shExpMatch(url,"*yimg.com/*/adv/*")
		|| shExpMatch(url,"*yimg.com/*/promotions/*")
	    )
	)
	// "eyewonder" ads at Yahoo
	|| dnsDomainIs(host,"qz3.net")
	|| dnsDomainIs(host,".eyewonder.com")

	// background ad images
	|| dnsDomainIs(host,"buzzcity.com")

	// FortuneCity - ads and tracking
	|| (dnsDomainIs(host,".fortunecity.com")
	    && (    shExpMatch(url,"*/js/adscript*")
		 || shExpMatch(url,"*/js/fctrack*")
	    )
	)

	// zdnet
	// tracking webbugs:
	// http://gserv.zdnet.com/clear/ns.gif?a000009999999999999+2093
	|| (dnsDomainIs(host, ".zdnet.com")
	    && (   dnsDomainIs(host, "ads3.zdnet.com")
		|| host == "gserv.zdnet.com"
		|| shExpMatch(url, "*/texis/cs/ad.html")
		|| shExpMatch(url, "*/adverts")
	     )
	)

	// cnet
	// web bugs and ad redirections
	// taken care of by hostname rules:
	//	http://adimg.com.com/...
	//	http://adlog.com.com/...
	// http://dw.com.com/clear/c.gif
	// http://dw.com.com/redir?astid=2&destUrl=http%3A%2F%2Fwww.buy ...
	// http://mads.com.com/mac-ad?...
	|| (host == "dw.com.com" || host == "mads.com.com")
	|| (dnsDomainIs(host, ".com.com")
	    && (   host == "dw.com.com"
		|| host == "mads.com.com"
	     )
	)

	// nytimes
	|| (dnsDomainIs(host, ".nytimes.com")
	    && shExpMatch(url,"*/adx/*")
	)

	// pop-after
	|| dnsDomainIs(host, ".unicast.net")


	// Be Free affiliate ads
	|| dnsDomainIs(host, ".reporting.net")
	|| dnsDomainIs(host, ".affliate.net")
	|| (dnsDomainIs(host, ".akamai.net")
	    && shExpMatch(url, "*.affiliate.net/*")
	)

	// Infospace.com popunder
	// for "webmarket.com" & "shopping.dogpile.com" -- just say no!
	|| (dnsDomainIs(host, ".infospace.com")
	    && shExpMatch(url, "*/goshopping/*")
	)
	|| dnsDomainIs(host, ".webmarket.com")
	|| dnsDomainIs(host, "shopping.dogpile.com")

	// goto.com popunder for information.gopher.com
	|| dnsDomainIs(host, "information.gopher.com")

	// About.com popunder and floating ad bar
	|| (dnsDomainIs(host, ".about.com")
	    && (0
	    || shExpMatch(url, "*/sprinks/*")
	    || shExpMatch(url, "*about.com/0/js/*")
	    || shExpMatch(url, "*about.com/f/p/*")
	    )
	)

	// Dell
	|| (dnsDomainIs(host, ".dell.com")
	    && shExpMatch(url, "*/images/affiliates/*")
	)

	// IFilm iframes
	|| (dnsDomainIs(host, ".ifilm.com")
	    && (shExpMatch(url, "*/partners/*")
	        || shExpMatch(url, "*/redirect*")
	    )
	)

	// tomshardware
	// they are most annoying:
	// - cookies on their background images to track you
	// - looping shockwave ads
	// this kills most of the crud
//	     || isInNet(host, "216.92.21.0", "255.255.255.0")
	|| ((dnsDomainIs(host, ".tomshardware.com")
	     || shExpMatch(host, "216.92.21.*"))
	    && (   shExpMatch(url, "*/cgi-bin/banner*")
	        || shExpMatch(url, "*/cgi-bin/bd.m*")
	        || shExpMatch(url, "*/images/banner/*")
	    )
	)

	|| shExpMatch(url, "*mapsonus.com/ad.images*")

	// Slashdot: added these when I saw hidden 1x1 images with cookies
	|| dnsDomainIs(host, "adfu.blockstackers.com")
	|| (dnsDomainIs(host, "slashdot.org")
	    && (
	           shExpMatch(url, "*/slashdot/pc.gif*")
		|| shExpMatch(url, "*/pagecount.gif*")
		|| shExpMatch(url, "*/adlog.pl*")
	    )
        )
	|| dnsDomainIs(host, "googlesyndication.com")
	|| dnsDomainIs(host, "google-analytics.com")

	// it-aint-cool.com
	|| (dnsDomainIs(host, "aintitcool.com")
	    && (
	           shExpMatch(url, "*/newline/*")
		|| shExpMatch(url, "*/drillteammedia/*")
		|| shExpMatch(url, "*/foxsearchlight/*")
		|| shExpMatch(url, "*/media/aol*")
		|| shExpMatch(url, "*swf")
	    )
	)

	// Staples & CrossMediaServices
	|| (dnsDomainIs(host, ".staples.com")
	    && shExpMatch(url, "*/pixeltracker/*")
	)
	|| dnsDomainIs(host, "pt.crossmediaservices.com")

	// OfficeMax affiliate art (affArt->affart because of toLowerCase)
	|| (dnsDomainIs(host, ".officemax.com")
	    && shExpMatch(url, "*/affart/*")
	)

	// complicated JavaScript for directed ads!
// 1/5/2004: allow /js/ as they now use it for graphs
//	|| (dnsDomainIs(host, ".anandtech.com")
//	    && (shExpMatch(url,"*/js/*")
//	        || shExpMatch(url,"*/bnr_*")
//	    )
//	)

	// hardocp
	// http://65.119.30.151/UploadFilesForNewegg/onlineads/newegg728hardocp.swf
	|| (host == "hera.hardocp.com")
	|| shExpMatch(url,"*/onlineads/*")

	// complicated JavaScript for gliding ads!
	|| (dnsDomainIs(host, ".fatwallet.com")
	    && shExpMatch(url,"*/js/*")
	)

	// cnet ads
	|| dnsDomainIs(host, "promo.search.com")

	// IMDB celeb photos
	// (Photos/CMSIcons->photos/cmsicons because of toLowerCase)
	|| (dnsDomainIs(host, "imdb.com")
	    && (   shExpMatch(url, "*/photos/cmsicons/*")
	        || shExpMatch(url, "*/icons/*/celeb/*")
	        || shExpMatch(url, "*.swf")
	    )
	)
	// incredibly annoying IMDB shock/flash ads
	|| dnsDomainIs(host, "kliptracker.com")
	|| dnsDomainIs(host, "klipmart.com")

	// more incredibly annoying shock/flash ads
	|| host == "avpa.javalobby.org"

	|| host == "spinbox.techtracker.com"

	// Amazon affiliate 'search'. retrieves a JS that writes new HTML
	// that references one or more images "related to your search".
	// (If there is a real use for rcm.amazon.com, let me know)
	// http://rcm.amazon.com/e/cm?t=starlingtechnolo&amp;l=st1&amp;search=cynicism&amp;mode=books&amp;p=11&amp;o=1&amp;bg1=CEE7FF&amp;fc1=000000&amp;lc1=083194&amp;lt1=_blank
	|| host == "rcm.amazon.com"

	// megaupload affiliate
	|| (dnsDomainIs(host, ".megaupload.com") && (
		   shExpMatch(url, "*/aff*.php")
		|| shExpMatch(url, "*/mrads/*")
	    )
	)
	|| dnsDomainIs(host, ".megaflirt.com")

	|| dnsDomainIs(host, ".ifriends.com")

	|| ((dnsDomainIs(host, ".gamecopyworld.com")
	     || dnsDomainIs(host, ".linkworld.com")
	     || dnsDomainIs(host, ".filetarget.com")
	    )&& (
		   shExpMatch(url, "*/ii/*")
		|| shExpMatch(url, "*/@_eve*")
//		|| shExpMatch(url, "*/@*")
	    )
	)

	|| dnsDomainIs(host, "lookoutmovies.com")
	|| dnsDomainIs(host, "tube-player.com")


	// www.afcyhf.com/image-1742473-10472361
	// www.tkqlhce.com/image-1742473-10510557
	|| re_crud.test(url)


	//////
	//
	// "sponsored" and "trending" content
	//
	|| dnsDomainIs(host, ".taboola.com")
	|| dnsDomainIs(host, ".taboolasyndication.com")
	|| dnsDomainIs(host, ".disqus.com")
	|| dnsDomainIs(host, ".revcontent.com")

	//////
	//
	// Other "Scum And Villainry"
	//

	// Popup from "reserved" domains at register.com
	// (I considered blocking all of register.com)
	|| (dnsDomainIs(host, ".register.com")
	    && (shExpMatch(url,"*.js")
		|| shExpMatch(host, "searchtheweb*")
		|| shExpMatch(host, "futuresite*")
	    )
	)

	|| dnsDomainIs(host, ".oingo.com")
	|| dnsDomainIs(host, ".namingsolutions.com")

	// "Data collection"
	|| dnsDomainIs(host, "coremetrics.com")

	// Sets your home page
	|| dnsDomainIs(host, "firehunt.com")

	// tracking
	|| dnsDomainIs(host, "appliedsemantics.com")

	// Scum who buy ad space from the above
	// || dnsDomainIs(host, ".hartfordrents.com")
	// || dnsDomainIs(host, ".chicagocomputerrentals.com")
	// || dnsDomainIs(host, ".ccrsolutions.com")
	// || dnsDomainIs(host, ".rushcomputer.com")
	// || dnsDomainIs(host, ".localesimates.com")
	// || dnsDomainIs(host, ".unitedvision.com")
	// XXX this might need the resolver
//	|| isInNet(host, "216.216.246.31", "255.255.255.255")
	|| (host == "216.216.246.31")

	// avsforum ads
//	|| isInNet(host, "216.66.21.35", "255.255.255.255")
	|| (host == "216.66.21.35")
	|| dnsDomainIs(host, ".avsads.com")

	// bogus "search" sites at non-existent sites
	|| dnsDomainIs(host, ".search411.com")

	// palmgear.com
	|| (dnsDomainIs(host, "palmgear.com")
	    && (   shExpMatch(url, "*/adsales/*")
		|| shExpMatch(url, "*/emailblast*")
	    )
	)

	|| dnsDomainIs(host, "prreleases.net")

	//////
	//
	// Contributed adult sites
	//

	|| dnsDomainIs(host, "porntrack.com")
	|| dnsDomainIs(host, "sexe-portail.com")
	|| dnsDomainIs(host, "sextracker.com")
	|| dnsDomainIs(host, "sexspy.com")
	|| dnsDomainIs(host, "offshoreclicks.com")
	|| dnsDomainIs(host, "exxxit.com")
	|| dnsDomainIs(host, "private-dailer.biz")
	|| shExpMatch(url, "*retestrak.nl/misc/reet.gif")
	|| shExpMatch(url, "*dontstayin.com/*.swf")
	|| shExpMatch(url, "*pornotube.com/textads*")
	|| dnsDomainIs(host, "xratedbucks.com")
	|| dnsDomainIs(host, "hornymatches.com")
	|| dnsDomainIs(host, "hornymatches.com")
	|| dnsDomainIs(host, "etology.com")
	|| dnsDomainIs(host, "streamray.com")
	|| dnsDomainIs(host, "awempire.com")
	|| dnsDomainIs(host, "promos.fling.com")
	|| dnsDomainIs(host, "pussygreen.com")
	|| dnsDomainIs(host, "livejasmin.com")
	|| dnsDomainIs(host, "imlive.com")
	|| dnsDomainIs(host, "ihookup.com")

	|| (dnsDomainIs(host, "shufuni.com")
	    && (   shExpMatch(url, "*images/activepage*")
	    )
	)

	//EXTRA-BLOCK-RULES
    ) {
	//LOG2 alert("no-ads blocking: " + url);

	// deny this request
	return blackhole;

    } else {
	//LOG3 alert("no-ads allowing: " + url);

	// all other requests go direct and avoid any overhead
	return normal;
    }
}

///////////////////////////////////////////////////////////////////////////////
//
// This line is just for testing; you can ignore it.  But, if you are having
// problems where you think this PAC file isn't being loaded, then change this
// to read "if (1)" and the alert box should appear when the browser loads this
// file.
//
// This works for IE4, IE5, IE5.5, IE6 and Netscape 2.x, 3.x, and 4.x.
// (For IE6, tested on Win2K)
// This does not work for Mozilla before 1.4 (and not for Netscape 6.x).
// In Mozilla 1.4+ and Fireox, this will write to the JavaScript console.
//
if (0) {
	alert("no-ads.pac: LOADED:\n" +
		"	version:	"+noadsver+"\n" +
		"	blackhole:	"+blackhole+"\n" +
		"	normal:		"+normal+"\n" +
		"	localproxy:	"+localproxy+"\n" +
		"	bypass:		"+bypass+"\n"
		//MSG
	);
}

// The above should show you that this JavaScript is executed in an
// unprotected global context.  NEVER point at someone elses autoconfig file;
// always load from your own copy!

// an alert that returns true (normally it returns void)
function alertmatch(str)
{
	alert(str);
	return 1;
}

///////////////////////////////////////////////////////////////////////////////
//
// Replacement function for dnsDomainIs().  This is to replace the
// prefix problem, which a leading '.' used to be used for.
//
//	dnsDomainIs("bar.com", "bar.com") => true
//	dnsDomainIs("www.bar.com", "bar.com") => true
//	dnsDomainIs("www.foobar.com", "bar.com") => true	<<< incorrect
//
//	_dnsDomainIs("bar.com", "bar.com") => true
//	_dnsDomainIs("www.bar.com", "bar.com") => true
//	_dnsDomainIs("www.foobar.com", "bar.com") => false	<<< correct
//
function _dnsDomainIs(host, domain) {
    if (host.length > domain.length) {
	return (host.substring(host.length - domain.length - 1) == "."+domain);
    }
    return (host == domain);
}

///////////////////////////////////////////////////////////////////////////////
//
// Tired of reading boring comments?  Try reading today's comics:
//	http://www.schooner.com/~loverso/comics/
//
// or getting a quote from my collection:
//	http://www.schooner.com/~loverso/quote/
//

// eof
	//intelliserv.net
	//intellisrv.net
	//rambler.ru
	//rightmedia.net
	//calloffate.com
	//fairmeasures.com
