# mock-uv

## Installation

`npm install`

And run

`node app.js`

## Exemple

Request POST

```
curl -X POST -H "Content-Type: text/xml" -d '<soapenv:Envelope
	xmlns:xsd="http://www.w3.org/2001/XMLSchema"
	xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
>
	<soapenv:Header/>
	<soapenv:Body>
		<GetLinkVoucherRequestMessage>
			<flight>
				<carrierCode type="tns:UVString">world</carrierCode>
				<flightNumber type="tns:UVString">006</flightNumber>
				<arrivalStation type="tns:UVString">JFK</arrivalStation>
				<departureDate type="tns:UVString">18022013</departureDate>
				<departureStation type="tns:UVString">CDG</departureStation>
			</flight>
			<voucher>
				<amount type="tns:UVString">8</amount>
        <id type="tns:UVString">8</id>
			</voucher>
		</GetLinkVoucherRequestMessage>
	</soapenv:Body>
</soapenv:Envelope>' "https://voucherservice-lmzmcydhxx.now.sh/voucher?wsdl="
```

Response

```
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:examples:helloservice">
    <soapenv:Header/>
    <soapenv:Body>
        <GetLinkVoucherResponseMessage soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
            <url type="tns:UVString">http://u-v.io/</url>
        <GetLinkVoucherResponseMessage>
    </soapenv:Body>
</soapenv:Envelope>
```
