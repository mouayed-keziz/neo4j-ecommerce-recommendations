const fs = require('fs');
const array_of_cpus = [
	"Intel Core i3",
	"Intel Core i5",
	"Intel Core i7",
	"Intel Core i9",
	"Intel Core i3-10100",
	"Intel Core i5-10400",
	"Intel Core i5-10600K",
	"Intel Core i7-10700K",
	"AMD Ryzen 3",
	"AMD Ryzen 5",
	"AMD Ryzen 7",
	"AMD Ryzen 9",
	"AMD Ryzen Threadripper",
	"AMD Ryzen Pro",
	"AMD Ryzen Threadripper Pro",
	"AMD Ryzen Threadripper 3990X",
	"AMD Ryzen Threadripper 3970X",
]

const array_of_gpus = [
	"AMD Radeon RX 5500 XT",
	"AMD Radeon RX 5600 XT",
	"AMD Radeon RX 5700",
	"AMD Radeon RX 5700 XT",
	"AMD Radeon RX 580",
	"AMD Radeon RX 590",
	"AMD Radeon RX Vega 56",
	"AMD Radeon RX Vega 64",
	"NVIDIA GeForce GTX 1050",
	"NVIDIA GeForce GTX 1050 Ti",
	"NVIDIA GeForce GTX 1060",
	"NVIDIA GeForce GTX 1070",
	"NVIDIA GeForce GTX 1070 Ti",
	"NVIDIA GeForce GTX 1080",
	"NVIDIA GeForce GTX 1080 Ti",
	"NVIDIA GeForce GTX 1650",
	"NVIDIA GeForce GTX 1650 Super",
	"NVIDIA GeForce GTX 1660",
	"NVIDIA GeForce GTX 1660 Super",
	"NVIDIA GeForce GTX 1660 Ti",
	"NVIDIA GeForce GTX 2060",
	"NVIDIA GeForce GTX 2060 Super",
	"NVIDIA GeForce GTX 2070",
	"NVIDIA GeForce GTX 2070 Super",
	"NVIDIA GeForce GTX 2080",
	"NVIDIA GeForce GTX 2080 Super",
	"NVIDIA GeForce GTX 2080 Ti",
	"NVIDIA GeForce RTX 2060",
	"NVIDIA GeForce RTX 2060 Super",
	"NVIDIA GeForce RTX 2070",
	"NVIDIA GeForce RTX 2070 Super",
	"NVIDIA GeForce RTX 2080",
	"NVIDIA GeForce RTX 2080 Super",
	"NVIDIA GeForce RTX 2080 Ti",
	"NVIDIA GeForce RTX 3060",
	"NVIDIA GeForce RTX 3060 Ti",
	"NVIDIA GeForce RTX 3070",
	"NVIDIA GeForce RTX 3080",
	"NVIDIA GeForce RTX 3090",
]

const array_of_brands = [
	"Apple",
	"Samsung",
	"Lenovo",
	"HP",
	"ASUS",
	"MSI",
	"Razer",
	"Alienware",
	"Microsoft",
	"Google",
	"LG",
	"Sony",
	"Xiaomi",
	"Motorola",
	"HTC",
	"Blackberry",
	"Alcatel",
	"ZTE",
]

const array_of_disk_types = [
	"SSD",
	"HDD",
]

const array_of_disk_sizes = [
	"128GB",
	"256GB",
	"512GB",
	"1TB",
	"2TB",
]

const array_of_ram_sizes = [
	"4GB",
	"8GB",
	"16GB",
	"32GB",
	"64GB",
]

const array_of_ram_types = [
	"DDR3",
	"DDR4",
]

const array_of_ram_frequencies = [
	"1600MHz",
	"2133MHz",
	"2400MHz",
	"2666MHz",
	"3000MHz",
	"3200MHz",
	"3600MHz",
	"4000MHz",
	"4400MHz",
]

const array_of_screen_sizes = [
	"13.3",
	"14",
	"15.6",
	"17.3",
]

const array_of_screen_resolutions = [
	"1920x1080",
	"2560x1440",
	"3840x2160",
]

const array_of_screen_refresh_rates = [
	"60Hz",
	"120Hz",
	"144Hz",
]

const array_of_screen_types = [
	"IPS",
	"TN",
	"VA",
	"OLED",
]

const generateRandomLaptop = () => {
	const laptop = {
		brand: array_of_brands[Math.floor(Math.random() * array_of_brands.length)],
		price: Math.floor(Math.random() * 1000) + 100,
		ram_size: array_of_ram_sizes[Math.floor(Math.random() * array_of_ram_sizes.length)],
		ram_type: array_of_ram_types[Math.floor(Math.random() * array_of_ram_types.length)],
		ram_frequency: array_of_ram_frequencies[Math.floor(Math.random() * array_of_ram_frequencies.length)],
		disk_type: array_of_disk_types[Math.floor(Math.random() * array_of_disk_types.length)],
		disk_size: array_of_disk_sizes[Math.floor(Math.random() * array_of_disk_sizes.length)],
		screen_size: array_of_screen_sizes[Math.floor(Math.random() * array_of_screen_sizes.length)],
		screen_resolution: array_of_screen_resolutions[Math.floor(Math.random() * array_of_screen_resolutions.length)],
		screen_refresh_rate: array_of_screen_refresh_rates[Math.floor(Math.random() * array_of_screen_refresh_rates.length)],
		screen_type: array_of_screen_types[Math.floor(Math.random() * array_of_screen_types.length)],
		gpu: array_of_gpus[Math.floor(Math.random() * array_of_gpus.length)],
		cpu: array_of_cpus[Math.floor(Math.random() * array_of_cpus.length)],
	};

	return laptop;
}



const generateRandomLaptops = (count) => {
	const laptops = [];
	for (let i = 0; i < count; i++) {
		laptops.push(generateRandomLaptop());
	}
	return laptops;
}

const products = generateRandomLaptops(100);

const axios = require("axios");


function getProducts() {
	products.forEach(async (product) => {
		await axios.post("http://localhost:5000/products/", product);
	});
}

axios.post("http://localhost:5000/products/", products[0]);
