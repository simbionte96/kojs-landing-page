const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC6fc8jQwF1TcRA6r5YjKZdQ&part=snippet%2Cid&order=date&maxResults=10';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8d35afd8a7msh7616cc7621b3175p160acfjsn8fb3522fdfdb',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

//fetch('', option)
//	.then(response => response.json())
//	.then(response => console.log(response))
//	.catch(err => console.error(err));

async function fetchData(urlApi) {
	const response = await fetch(urlApi, options);
	const data = await response.json();
	
	return data;
}


(async () => {
	try {
		const videos = await fetchData(API);
		
		let view = `
			${videos.items.map(video => `
				<div class="group relative">
        	<div
          	class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            	<img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        	</div>
        	<div class="mt-4 flex justify-between">
          	<h3 class="text-sm text-gray-700">
							<a href="https://www.youtube.com/watch?v=${video.id.videoId}"><span aria-hidden="true" class="absolute inset-0"></span></a>
							${video.snippet.title}
          	</h3>
        	</div>
      	</div>
			`).slice(0, 4).join('')}

		`;

		content.innerHTML = view;
	} catch (error){
		console.log(error);
	}
})();
