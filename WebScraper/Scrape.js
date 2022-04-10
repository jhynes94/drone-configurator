//Documentation
//https://github.com/GoogleChrome/puppeteer/blob/HEAD/docs/api.md#pageselectselector-values

const puppeteer = require('puppeteer');
var fs = require('fs');

const debug = false;

const ScapeProductLink = async function (baseURL) {

	const browser = await puppeteer.launch({ headless: !debug });

	const page = await browser.newPage();
	page.setViewport({ width: 1020, height: 800 });

	await page.goto(baseURL, { waitUntil: 'domcontentloaded' });

	//Scan through all product images and extract the href (link) to the product
	const result = await page.evaluate(() => {

		let elements = Array.from(document.querySelectorAll('.product-image'));
		let links = elements.map(element => {
			return element.href
		})

		return links;
	});

	return result

}

const GetProductInfo = async function (ProductURL) {

	const browser = await puppeteer.launch({ headless: !debug });

	const page = await browser.newPage();
	page.setViewport({ width: 1020, height: 800 });

	await page.goto(ProductURL, { waitUntil: 'domcontentloaded' });

	//Scan through all product images and extract the href (link) to the product
	const result = await page.evaluate(() => {
		let ldJSON = JSON.parse(document.querySelector('script[type="application/ld+json"]').innerText);
		let attributes = document.querySelector('#product-attribute-specs-table').innerHTML;

		return {ldJSON, data: attributes}
	});

	return result
}


async function app() {

	let linkArray = []
	let productsDatabase = []

	let pagesToScrape = 1 //Should be 10

	//Grabs all URLs to products releated to a specific catagory
	for (let i = 1; i <= pagesToScrape; i++) {
		console.log('Scraping page: ' + i)
		const links = await ScapeProductLink('https://www.getfpv.com/propellers.html?limit=100&p=' + i)
		linkArray = linkArray.concat(links)
	}

	console.log("Scanning product links completed with " + linkArray.length + "entries")

	for(link of linkArray){
		let productInfo = await GetProductInfo(link)
		fs.appendFile('datalog.txt', productInfo, function (err) {
			if (err) throw err;
		});

		console.log("Product " + productInfo.ldJSON.name + "Successfully scraped")
	}

	

	// //Trying to develop better detail scraping of web page
	// let productInfo = await GetProductInfo('https://www.getfpv.com/azure-power-vanover-5-popo-quick-swap-propeller-limited-edition.html')

	// let product = {
	// 	name: productInfo.ldJSON.name,
	// 	image: productInfo.ldJSON.image,
	// }
	// console.log(productInfo.data)
	// console.log(product)
	return
}

app();