var request = require('postman-request');
var  apiSecenekleri = {
  sunucu: "http://localhost:3000",
  apiYolu:'/api/mekanlar/'
};
var mesafeyiFormatla = function(mesafe) {
  var yeniMesafe, birim;
  if (mesafe > 1000) {
    yeniMesafe = parseFloat(mesafe/1000).toFixed(2);
    birim = 'km';
  } else {
    yeniMesafe = parseFloat(mesafe).toFixed(1);
    birim = ' m';
  }
  return yeniMesafe + birim;
}

var anasayfaOlustur = function(req, res, cevap, mekanListesi) {
  var mesaj;
  // gelen mekanlarListesi eğer dizi tipinde değilse hata ver
  if (!(mekanListesi instanceof Array)) {
    mesaj = 'API HATASI: Bir şeyler ters gitti.';
    mekanListesi = [];
  } else { // eğer belirlenen mesafe içinde bulunamadıysa bilgilendir
    if (!mekanListesi.length) {
      mesaj = 'Civarda Herhangi Bir Mekan Bulunamadı!';
    }
  }

  res.render('mekanlar-liste', { 
    title : 'Mekan Bul',
    sayfaBaslik : {
      siteAd : 'Mekan 32',
      aciklama : 'Isparta civarındaki mekanları keşfedin!'
    },
    //footer : footer,
    mekanlar: mekanListesi,
    mesaj: mesaj,
    cevap: cevap
  });
}

const anaSayfa = function(req, res, next) {
  istekSecenekleri = {
    url : apiSecenekleri.sunucu + apiSecenekleri.apiYolu, // tam yol
    method : 'GET', // veri çekeceğimiz için GET methodunu kullan
    json : {}, // dönen veri json formatında olacak
    // sorgu parametreleri. URL'de yazılan enlem ve boylamı al
    // localhost:3000/?enlem=37.7&boylam=30.5 gibi
    qs : {
      enlem : req.query.enlem,
      boylam : req.query.boylam
    }
  };
  
  // istekte bulun
  request(istekSecenekleri, 
    // geri dönüş methodu (callback function)
    function(hata, cevap, mekanlar) {
      var i, gelenMekanlar;
      gelenMekanlar = mekanlar;
      // sadece 200 durum kodunda ve mekanlar doluyken işlem yap
      if (!hata && gelenMekanlar.length) {
        for (i = 0; i < gelenMekanlar.length; i++) {
          gelenMekanlar[i].mesafe = mesafeyiFormatla(gelenMekanlar[i].mesafe);
        }
      }
      anasayfaOlustur(req, res, cevap, gelenMekanlar);
    }
  );
}

var detaySayfasiOlustur = function(req, res, mekanDetaylari) {
  res.render('mekan-detay', { 
    title : mekanDetaylari.ad,
    sayfaBaslik : mekanDetaylari.ad,
    mekanBilgisi : mekanDetaylari,
    
  });
}

var hataGoster = function(req, res, durum) {
  var baslik, icerik
  if (durum == 404) {
    baslik = '404, Sayfa Bulunamadı!'
    icerik = 'Aradığınız sayfayı bulamadık!'
  } else {
    baslik = durum + 'Bir şeyler ters gitti!'
    icerik = 'Ters giden bir şey var!'
  }

  res.status(durum);
  res.render('error', {
    baslik: baslik,
    icerik: icerik
    
  });
}

const mekanBilgisi = function(req, res, next) {
  istekSecenekleri = {
    url : apiSecenekleri.sunucu + apiSecenekleri.apiYolu + req.params.mekanid,
    method : 'GET',
    json : {}
  };

  request(istekSecenekleri, function(hata, cevap, mekanDetaylari) {
    var gelenMekan = mekanDetaylari;
    // eğer statusCode 200 ise bilgi vardır
    if (cevap.statusCode == 200) {
      // enlem ve boylam bir dizi şeklinde geliyor, bunu ayır
      gelenMekan.koordinatlar = {
        enlem: mekanDetaylari.koordinatlar[0],
        boylam: mekanDetaylari.koordinatlar[1]
      };
      detaySayfasiOlustur(req, res, gelenMekan);
    } else {
      hataGoster(req, res, cevap.statusCode);
    }
  });
}

const yorumEkle = function(req, res, next) {
  res.render('yorum-ekle', { 
    title : 'Yorum Ekle',
    
  });
}


module.exports = {
  anaSayfa,
  mekanBilgisi, 
  yorumEkle
}



/*var express = require('express');
var router = express.Router();
const anaSayfa=function(req, res, next) {
  res.render('mekanlar-liste',

  { 'baslik': 'Anasayfa',
     'sayfaBaslik':{
        'siteAd' :'Mekan32',
        'aciklama':'Isparta civarındaki mekanları keşfedin!'
    },
        'mekanlar':[
          {
            'ad':'Starbucks',
            'adres':'Centrum Garden AVM',
            'puan':3,
            'imkanlar':['Dünya Kahveleri','Kekler','Pastalar'],
            'mesafe':'10km'
          },
          {
            'ad':'Gloria Jeans',
            'adres':'SDÜ Doğu Kampüsü',
            'puan':2,
            'imkanlar':['Kahve','Çay','Pasta'],
            'mesafe':'1km'
          },
          {
            'ad':'Özsüt',
            'adres':'SDÜ Doğu Kampüsü',
            'puan':4,
            'imkanlar':['Süt','Çay','Pasta'],
            'mesafe':'5km'
          },
          {
            'ad':'Kahve Dünyası',
            'adres':'SDÜ Doğu Kampüsü',
            'puan':5,
            'imkanlar':['Fanta','Sprite'],
            'mesafe':'2km'
          },
          {
            'ad':'Mudo',
            'adres':'SDÜ Doğu Kampüsü',
            'puan':2,
            'imkanlar':['Filtre Kahve','Çay','Yeşil Çay'],
            'mesafe':'1km'
          }
  
    ]
  }
  );
}

const mekanBilgisi=function(req, res, next) {
  res.render('mekan-detay', { 
    'baslik': 'Mekan Bilgisi',
    'sayfaBaslik':'Starbucks',
    'mekanBilgisi':{
      'ad':'Starbucks',
      'adres':'Centrum Garden AVM',
      'puan':3,
      'imkanlar':['Dünya Kahveleri','Kekler','Pastalar'],
      'koordinatlar':{
        'enlem' : '37.781885',
        'boylam' : '30.566034'
      },
      'saatler' : [
        {
          'gunler' : 'Pazartesi-Cuma',
          'acilis' : '7:00',
          'kapanis' : '23:00',
          'kapali' : false
        },
        {
          'gunler' : 'Cumartesi',
          'acilis': '9:00',
          'kapanis':'22:00',
          'kapali' :  false
        },
        {
          'gunler' : 'Pazar',
          'kapali' :  true
        }
      ],
      'yorumlar':[
        {
          'yorumYapan' : 'Kader NOR',
          'puan': 3,
          'tarih': '03.12.2020',
          'yorumMetni':'Kahveleri güzel.'
        },
        {
          'yorumYapan' : 'Cem Fillik',
          'puan': 1,
          'tarih': '04.12.1997',
          'yorumMetni':'Bu nasıl Mekan32.'
        }
      ]
    }
    
});
}

const yorumEkle=function(req, res, next) {
  res.render('yorum-ekle', { title: 'Yorum Ekle' });
}

module.exports={
anaSayfa,
mekanBilgisi,
yorumEkle
}*/