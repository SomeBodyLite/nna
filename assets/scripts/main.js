const header = document.querySelector('#header');

window.addEventListener('load', () => {
	const textBlock = document.querySelectorAll('#slide-text');
	textBlock.forEach((e) => {
		e.classList.add('slide-in-text-active');
	});
	const videoBlocks = document.querySelectorAll('#video');
	videoBlocks.forEach((e) => {
		e.classList.add('slide-in-video-active');
	});
	const btns = document.querySelectorAll('#animated-btn');
	btns.forEach((e) => {
		e.classList.add('animated-btn-active');
	});

	const images = document.querySelectorAll('#sec-card-img');

	images.forEach((e) => {
		e.classList.remove('scale-[4.5]');
		e.classList.remove('top-[-1250px]');
		e.classList.remove('top-[1250px]');
	});
	setVideoEvents();
});

const setVideoEvents = () => {
	const video = document.querySelectorAll('#hover-video-parent');
	video.forEach((e) => {
		const videos = e.querySelectorAll('video');
		const videoWSs = e.querySelectorAll('video-without-slide');
		if (videoWSs.length > 0) {
			e.addEventListener('mouseenter', () => {
				videoWSs.forEach((video) => {
					video.play();
				});
			});

			e.addEventListener('mouseleave', () => {
				videoWSs.forEach((video) => {
					video.pause();
				});
			});
		}
		e.addEventListener('mouseenter', () => {
			videos.forEach((video) => {
				video.play();
			});
		});

		e.addEventListener('mouseleave', () => {
			videos.forEach((video) => {
				video.pause();
			});
		});
	});
};

let currentBlocks = {
	title: null,
	card: null,

	baseBlock: null,
	itemBlock1: null,
	itemBlock2: null,
	itemBlock1Margin: null,

	textCollection: null,
	textNameCollection: null,
	scrollElem: null,
};

let flagToScroll = false;
const cardHome = document.querySelector('#card-home');
const cardFear = document.querySelector('#card-fear');
const setBlockData = (card) => {
	currentBlocks.title = card;
	if ((card != 'home') | 'fear') {
		console.log('неверное значение');
	}

	currentBlocks.card = card == 'home' ? cardHome : cardFear;

	currentBlocks.baseBlock = currentBlocks.card.querySelector('#base-block');

	console.log(currentBlocks);

	currentBlocks.textCollection =
		currentBlocks.baseBlock.querySelector('#movable-text');
	currentBlocks.textNameCollection =
		currentBlocks.baseBlock.querySelector('#movable-text-2');
	currentBlocks.scrollElem =
		currentBlocks.baseBlock.querySelector('#hidden-scroll');
	currentBlocks.itemBlock2 =
		currentBlocks.baseBlock.querySelector('#item-block2');
	currentBlocks.itemBlock1 =
		currentBlocks.baseBlock.querySelector('#item-block1');
	currentBlocks.itemBlock1Margin = currentBlocks.baseBlock.querySelector(
		'#item-block1-margin'
	);

	console.log(currentBlocks);
	moveBlock();
};

function handleWheel(event) {
	event.preventDefault();
	if (!flagToScroll) {
		flagToScroll = true;
		currentBlocks.itemBlock2.scrollIntoView({ behavior: 'smooth' });
		setTimeout(() => {
			flagToScroll = false;
		}, 500);
	}
}

const moveBlock = () => {
	document.body.classList.add(
		'md:overflow-visible',
		'xl:overflow-hidden',
		'overflow-visible'
	);
	header.scrollIntoView({ behavior: 'smooth' });

	currentBlocks.baseBlock.addEventListener('wheel', handleWheel);
	currentBlocks.baseBlock.classList.add('z-50');
	currentBlocks.baseBlock.classList.add('bg-black');
	currentBlocks.baseBlock.classList.add('movable-block-active');

	if (currentBlocks.title == 'fear') {
		currentBlocks.baseBlock.classList.add(
			'left-[calc((-100vw+32px)+(100vw/2))]'
		);
		currentBlocks.baseBlock.classList.remove(
			'xl:top-[60px]',
			'md:top-[760px]',
			'top-[607px]',
			'md:left-[60px]',
			'left-[32px]'
		);
	} else {
		currentBlocks.baseBlock.classList.add('left-[0px]');
		currentBlocks.baseBlock.classList.remove(
			'md:top-[60px]',
			'top-[32px]',
			'md:left-[60px]',
			'left-[32px]'
		);
	}

	currentBlocks.itemBlock1.classList.add('reverse-wrapper');

	currentBlocks.textCollection.classList.remove('text-sm');
	currentBlocks.textCollection.classList.add(
		'pb-[24px]',
		'text-[24px]',
		'translate-x-[-50%]',
		'left-1/2'
	);

	currentBlocks.textNameCollection.classList.add('md:text-[124px]');

	setTimeout(() => {
		currentBlocks.scrollElem.classList.add('opacity-100');
	}, 1000);
	setTimeout(() => {
		currentBlocks.itemBlock2.classList.remove('hidden');
	}, 1000);
};

const hideBlock = () => {
	document.body.classList.remove(
		'md:overflow-visible',
		'xl:overflow-hidden',
		'overflow-visible'
	);

	if (!flagToScroll) {
		flagToScroll = true;
		currentBlocks.itemBlock1.scrollIntoView({
			block: 'end',
			behavior: 'smooth',
		});

		flagToScroll = false;
	}
	setTimeout(() => {
		currentBlocks.baseBlock.removeEventListener('wheel', handleWheel);
		currentBlocks.itemBlock1.classList.remove('reverse-wrapper');

		currentBlocks.itemBlock2.classList.add('hidden');

		currentBlocks.textCollection.classList.add('text-sm');
		currentBlocks.textCollection.classList.remove(
			'pb-[24px]',
			'text-[24px]',
			'translate-x-[-50%]',
			'left-1/2'
		);

		currentBlocks.textNameCollection.classList.remove('md:text-[124px]');

		currentBlocks.scrollElem.classList.remove('opacity-100');

		if (currentBlocks.title == 'fear') {
			currentBlocks.baseBlock.classList.remove(
				'left-[calc((-100vw+32px)+(100vw/2))]'
			);
			currentBlocks.baseBlock.classList.add(
				'xl:top-[60px]',
				'md:top-[760px]',
				'top-[607px]',
				'md:left-[60px]',
				'left-[32px]'
			);
		} else {
			currentBlocks.baseBlock.classList.remove('left-[0px]');
			currentBlocks.baseBlock.classList.add(
				'md:top-[60px]',
				'top-[32px]',
				'md:left-[60px]',
				'left-[32px]'
			);
		}
		currentBlocks.baseBlock.classList.remove('movable-block-active');
		currentBlocks.baseBlock.classList.remove('z-50');
		currentBlocks.baseBlock.classList.remove('bg-black');
	}, 800);
};

let currentColorHome = 'black';
const switchColorHome = (color) => {
	if (currentColorHome == color) {
		return;
	} else {
		const containersVideo = document.querySelectorAll('.videos-home');
		containersVideo.forEach((container) => {
			const videos = container.querySelectorAll('video');
			videos.forEach((video) => {
				video.setAttribute('src', `./assets/videos/home_${color}.mp4`);
			});
		});
		const containerBtns = document.querySelectorAll('.home-btns');

		containerBtns.forEach((cont) => {
			const btns = cont.querySelectorAll('.cursor-pointer');
			btns.forEach((btn) => {
				if (btn.classList.contains('bg-[#8B8B8B1F]')) {
					btn.classList.remove('bg-[#8B8B8B1F]');
					btn.classList.add('bg-[#8B8B8B3D]');
				} else {
					btn.classList.add('bg-[#8B8B8B1F]');
					btn.classList.remove('bg-[#8B8B8B3D]');
				}
			});
		});

		currentColorHome = color;
	}
	setVideoEvents();
};

let currentColorFear = 'white';
const switchColorFear = (color) => {
	if (currentColorFear == color) {
		return;
	} else {
		const containersVideo = document.querySelectorAll('.videos-fear');
		containersVideo.forEach((container) => {
			const videos = container.querySelectorAll('video');
			videos.forEach((video) => {
				video.setAttribute('src', `./assets/videos/fear_${color}.mp4`);
			});
		});

		const containerBtns = document.querySelectorAll('.fear-btns');
		containerBtns.forEach((cont) => {
			const btns = cont.querySelectorAll('.cursor-pointer');
			btns.forEach((btn) => {
				if (btn.classList.contains('bg-[#8B8B8B1F]')) {
					btn.classList.remove('bg-[#8B8B8B1F]');
					btn.classList.add('bg-[#8B8B8B3D]');
				} else {
					btn.classList.add('bg-[#8B8B8B1F]');
					btn.classList.remove('bg-[#8B8B8B3D]');
				}
			});
		});

		currentColorFear = color;
	}
	setVideoEvents();
};
