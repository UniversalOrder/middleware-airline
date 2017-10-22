var express = require('express');
var http = require('http');
var parseString = require('xml2js').parseString;
var stripPrefix = require('xml2js').processors.stripPrefix;
var Builder = require('xml2js').Builder;
var util = require('util');
var url = require('url');
var async = require('async');
var bodyParser = require('body-parser');
var myutils = require('./myutils');
var request = require('request');
var Web3 = require('web3');
var config = require('./config');
var router = express.Router();
var voucherservice = {};

router.use(bodyParser.text({ type: '*/*' }));
router.use(function timeLogStart(req, res, next) {
    myutils.logger('Request start');
    res.locals.startTimeHR = process.hrtime();
    next();
});

router.post('/air-shopping', function (req, res, next) {
    var options = {
        method: 'POST',
        url: 'http://iata.api.mashery.com/athena/ndc162api',
        headers: {
           'authorization-key': 'cwet46xetc7mshtexchnthrb',
           'content-type': 'application/xml'
        },
        body: '<?xml version="1.0" encoding="UTF-8"?>\r\n<AirShoppingRQ EchoToken="feb37ad3-7314-48eb-bfa7-8a67da233271" Version="IATA2016.2" xmlns="http://www.iata.org/IATA/EDIST">\r\n\t<Document>\r\n\t\t<ReferenceVersion>1.0</ReferenceVersion>\r\n\t</Document>\r\n\t<Party>\r\n\t\t<Sender>\r\n\t\t\t<TravelAgencySender>\r\n\t\t\t\t<Name>JR TECHNOLOGIES</Name>\r\n\t\t\t\t<IATA_Number>20200154</IATA_Number>\r\n\t\t\t\t<AgencyID>00010080</AgencyID>\r\n\t\t\t</TravelAgencySender>\r\n\t\t</Sender>\r\n\t\t<Recipient>\r\n\t\t\t<ORA_Recipient>\r\n\t\t\t\t<AirlineID>C9</AirlineID>\r\n\t\t\t</ORA_Recipient>\r\n\t\t</Recipient>\r\n\t</Party>\r\n\t<Travelers>\r\n\t\t<Traveler>\r\n\t\t\t<AnonymousTraveler>\r\n\t\t\t\t<PTC Quantity="1">ADT</PTC>\r\n\t\t\t</AnonymousTraveler>\r\n\t\t\t<AnonymousTraveler>\r\n\t\t\t\t<PTC Quantity="1">CHD</PTC>\r\n\t\t\t</AnonymousTraveler>\r\n\t\t</Traveler>\r\n\t</Travelers>\r\n\t<CoreQuery>\r\n\t\t<OriginDestinations>\r\n\t\t\t<OriginDestination>\r\n\t\t\t\t<Departure>\r\n\t\t\t\t\t<AirportCode>LHR</AirportCode>\r\n\t\t\t\t\t<Date>2017-11-29</Date>\r\n\t\t\t\t</Departure>\r\n\t\t\t\t<Arrival>\r\n\t\t\t\t\t<AirportCode>BCN</AirportCode>\r\n\t\t\t\t</Arrival>\r\n\t\t\t\t<MarketingCarrierAirline>\r\n\t\t\t\t\t<AirlineID>C9</AirlineID>\r\n\t\t\t\t\t<Name>Kronos</Name>\r\n\t\t\t\t</MarketingCarrierAirline>\r\n\t\t\t</OriginDestination>\r\n\t\t</OriginDestinations>\r\n\t</CoreQuery>\r\n\t<Preference>\r\n\t\t<AirlinePreferences>\r\n\t\t\t<Airline>\r\n\t\t\t\t<AirlineID>C9</AirlineID>\r\n\t\t\t</Airline>\r\n\t\t</AirlinePreferences>\r\n\t</Preference>\r\n</AirShoppingRQ>' };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      parseString(body, function (err, result) {
        res.json(result["AirShoppingRS"]["ShoppingResponseID"][0]["ResponseID"][0]);
      });
    });
});

router.post('/order', function (req, res, next) {
    var responseId = req.params.responseId;
    
    var options = {
      method: 'POST',
      url: 'http://iata.api.mashery.com/athena/ndc162api',
      headers: {
         'authorization-key': 'cwet46xetc7mshtexchnthrb',
         'content-type': 'application/xml'
      },
      body: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n<OrderCreateRQ EchoToken="3fd98534-88b8-4e14-b25b-c04dca76d69d" Version="IATA2016.2" xmlns="http://www.iata.org/IATA/EDIST">\r\n\t<Document>\r\n\t\t<ReferenceVersion>1.0</ReferenceVersion>\r\n\t</Document>\r\n\t<Party>\r\n\t\t<Sender>\r\n\t\t\t<TravelAgencySender>\r\n\t\t\t\t<Name>JR TECHNOLOGIES</Name>\r\n\t\t\t\t<IATA_Number>20200154</IATA_Number>\r\n\t\t\t\t<AgencyID>00010080</AgencyID>\r\n\t\t\t</TravelAgencySender>\r\n\t\t</Sender>\r\n\t\t<Recipient>\r\n\t\t\t<ORA_Recipient>\r\n\t\t\t\t<AirlineID>C9</AirlineID>\r\n\t\t\t</ORA_Recipient>\r\n\t\t</Recipient>\r\n\t</Party>\r\n\t<Query>\r\n\t\t<Passengers>\r\n\t\t\t<Passenger ObjectKey="SH1">\r\n\t\t\t\t<PTC Quantity="1">ADT</PTC>\r\n\t\t\t\t<Name>\r\n\t\t\t\t\t<Surname>Sutarx</Surname>\r\n\t\t\t\t\t<Given>Pramodx</Given>\r\n\t\t\t\t\t<SurnameSuffix>Sr</SurnameSuffix>\r\n\t\t\t\t\t<Middle>R</Middle>\r\n\t\t\t\t</Name>\r\n\t\t\t\t<Contacts>\r\n\t\t\t\t\t<Contact>\r\n\t\t\t\t\t\t<AddressContact>\r\n\t\t\t\t\t\t\t<Street>Parsik Road</Street>\r\n\t\t\t\t\t\t\t<CityName>BOM</CityName>\r\n\t\t\t\t\t\t\t<PostalCode>400605</PostalCode>\r\n\t\t\t\t\t\t\t<County>IN</County>\r\n\t\t\t\t\t\t</AddressContact>\r\n\t\t\t\t\t\t<EmailContact>\r\n\t\t\t\t\t\t\t<Address>Pramozd@gmail.com</Address>\r\n\t\t\t\t\t\t</EmailContact>\r\n\t\t\t\t\t\t<OtherContactMethod>\r\n\t\t\t\t\t\t\t<Name>Mobile</Name>\r\n\t\t\t\t\t\t\t<Value>1234567890</Value>\r\n\t\t\t\t\t\t</OtherContactMethod>\r\n\t\t\t\t\t\t<PhoneContact>\r\n\t\t\t\t\t\t\t<Number CountryCode="91">9324597377</Number>\r\n\t\t\t\t\t\t</PhoneContact>\r\n\t\t\t\t\t</Contact>\r\n\t\t\t\t</Contacts>\r\n\t\t\t\t<Gender>Male</Gender>\r\n\t\t\t</Passenger>\r\n\t\t\t<Passenger ObjectKey="SH2">\r\n\t\t\t\t<PTC Quantity="1">CHD</PTC>\r\n\t\t\t\t<Name>\r\n\t\t\t\t\t<Surname>Papardoupas</Surname>\r\n\t\t\t\t\t<Given>Vaggelis</Given>\r\n\t\t\t\t\t<SurnameSuffix>Sr</SurnameSuffix>\r\n\t\t\t\t\t<Middle>R</Middle>\r\n\t\t\t\t</Name>\r\n\t\t\t\t<Contacts>\r\n\t\t\t\t\t<Contact>\r\n\t\t\t\t\t\t<EmailContact>\r\n\t\t\t\t\t\t\t<Address>parbardoup@gmail.com</Address>\r\n\t\t\t\t\t\t</EmailContact>\r\n\t\t\t\t\t</Contact>\r\n\t\t\t\t</Contacts>\r\n\t\t\t\t<Gender>Male</Gender>\r\n\t\t\t</Passenger>\r\n\t\t</Passengers>\r\n\t\t<OrderItems>\r\n\t\t\t<ShoppingResponse>\r\n\t\t\t\t<Owner>C9</Owner>\r\n\t\t\t\t<ResponseID>201-a9d350c79c6249a586f11ec26fadf876</ResponseID>\r\n\t\t\t\t<Offers>\r\n\t\t\t\t\t<Offer>\r\n\t\t\t\t\t\t<OfferID Owner="C9">1</OfferID>\r\n\t\t\t\t\t\t<OfferItems>\r\n\t\t\t\t\t\t\t<OfferItem>\r\n\t\t\t\t\t\t\t\t<OfferItemID Owner="C9">1_2</OfferItemID>\r\n\t\t\t\t\t\t\t\t<Passengers>\r\n\t\t\t\t\t\t\t\t\t<PassengerReference>SH1</PassengerReference>\r\n\t\t\t\t\t\t\t\t</Passengers>\r\n\t\t\t\t\t\t\t</OfferItem>\r\n\t\t\t\t\t\t\t<OfferItem>\r\n\t\t\t\t\t\t\t\t<OfferItemID Owner="C9">1_1</OfferItemID>\r\n\t\t\t\t\t\t\t\t<Passengers>\r\n\t\t\t\t\t\t\t\t\t<PassengerReference>SH2</PassengerReference>\r\n\t\t\t\t\t\t\t\t</Passengers>\r\n\t\t\t\t\t\t\t</OfferItem>\r\n\t\t\t\t\t\t</OfferItems>\r\n\t\t\t\t\t\t<TotalPrice>\r\n\t\t\t\t\t\t\t<SimpleCurrencyPrice Code="EUR">676.39</SimpleCurrencyPrice>\r\n\t\t\t\t\t\t</TotalPrice>\r\n\t\t\t\t\t</Offer>\r\n\t\t\t\t</Offers>\r\n\t\t\t</ShoppingResponse>\r\n\t\t</OrderItems>\r\n\t\t<Payments>\r\n\t\t\t<Payment>\r\n\t\t\t\t<Method>\r\n\t\t\t\t\t<PaymentCard>\r\n\t\t\t\t\t\t<CardType>CREDIT</CardType>\r\n\t\t\t\t\t\t<CardCode>VI</CardCode>\r\n\t\t\t\t\t\t<CardNumber>1111222233334444</CardNumber>\r\n\t\t\t\t\t\t<SeriesCode>584</SeriesCode>\r\n\t\t\t\t\t\t<CardHolderName>WERNHER VON BRAUN</CardHolderName>\r\n\t\t\t\t\t\t<EffectiveExpireDate>\r\n\t\t\t\t\t\t\t<Effective>0322</Effective>\r\n\t\t\t\t\t\t\t<Expiration>1022</Expiration>\r\n\t\t\t\t\t\t</EffectiveExpireDate>\r\n\t\t\t\t\t</PaymentCard>\r\n\t\t\t\t</Method>\r\n\t\t\t\t<Amount Taxable="true" Code="EUR">676.39</Amount>\r\n\t\t\t\t<Payer>\r\n\t\t\t\t\t<Name>\r\n\t\t\t\t\t\t<Surname>Patel</Surname>\r\n\t\t\t\t\t\t<Given>Ramesh</Given>\r\n\t\t\t\t\t</Name>\r\n\t\t\t\t\t<Contacts>\r\n\t\t\t\t\t\t<Contact>\r\n\t\t\t\t\t\t\t<EmailContact>\r\n\t\t\t\t\t\t\t\t<Address>ramesh@jrtechnologies.com</Address>\r\n\t\t\t\t\t\t\t</EmailContact>\r\n\t\t\t\t\t\t</Contact>\r\n\t\t\t\t\t</Contacts>\r\n\t\t\t\t</Payer>\r\n\t\t\t</Payment>\r\n\t\t</Payments>\r\n\t</Query>\r\n</OrderCreateRQ>\r\n'
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      parseString(body, function (err, result) {
        console.log(result)
        var orderId = result["OrderViewRS"]["Response"][0]["Order"][0]["OrderID"][0]["_"];
        var totalPrice = result["OrderViewRS"]["Response"][0]["Order"][0]["TotalOrderPrice"][0]["DetailCurrencyPrice"][0]["Total"][0]["_"];
        var web3 = new Web3();

        res.json({
          orderId: orderId,
          totalPrice: totalPrice,
          signature: web3.sha3(orderId) // FIXME mock sign the orderId
        });
      });
    });
});

router.use(function timeLogEnd(req, res, next) {
    var durationHR = process.hrtime(res.locals.startTimeHR);
    myutils.logger("Request end. Duration: %ds %dms", durationHR[0], durationHR[1] / 1000000);
    next();
});

module.exports = router;
