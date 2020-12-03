var express = require('express');
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
}