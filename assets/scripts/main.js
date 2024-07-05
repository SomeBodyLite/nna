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

	const video = document.querySelectorAll('#hover-video-parent');
	video.forEach((e) => {
		const video = e.querySelector('video');
		const videoWS = e.querySelector('video-without-slide');
		if (videoWS) {
			e.addEventListener('mouseenter', () => {
				videoWS.play();
			});

			e.addEventListener('mouseleave', () => {
				videoWS.pause();
			});
		}
		e.addEventListener('mouseenter', () => {
			video.play();
		});

		e.addEventListener('mouseleave', () => {
			video.pause();
		});
	});
});
let flagToScroll = false;
const itemBlock2 = document.getElementById('item-block2');
const itemBlock1 = document.getElementById('item-block1');
const itemBlock1Margin = document.getElementById('item-block1-margin');
function handleWheel(event) {
	event.preventDefault(); // Отменяем стандартное поведение прокрутки колесом мыши
	if (!flagToScroll) {
		flagToScroll = true;
		itemBlock2.scrollIntoView({ behavior: 'smooth' });
		setTimeout(() => {
			flagToScroll = false;
		}, 500);
	}
}

let blockIsOpen = false;
const block = document.querySelector('#movable-block');
const header = document.querySelector('#header');
const moveLeftBlock = () => {
	blockIsOpen = true;
	document.body.classList.add('overflow-hidden');
	header.scrollIntoView({ behavior: 'smooth' });

	block.addEventListener('wheel', handleWheel);
	block.classList.add('movable-block-active');

	itemBlock1Margin.classList.remove('mr-auto');
	itemBlock1Margin.classList.add('mx-auto');
	itemBlock1.classList.add('reverse-wrapper');

	const text = document.querySelector('#movable-text');
	text.classList.remove('translate-x-[-134%]');
	text.classList.add('translate-x-[-50%]');

	const textSec = document.querySelector('#movable-text-2');
	textSec.classList.add('md:text-[124px]');

	const scroll = document.querySelector('#hidden-scroll');
	scroll.classList.remove('hidden');
	setTimeout(() => {
		scroll.classList.add('scroll-image-active', 'flex');
	}, 100);
	setTimeout(() => {
		itemBlock2.classList.remove('hidden');
	}, 1000);
};

const unMoveLeftBlock = () => {
	blockIsOpen = false;
	document.body.classList.remove('overflow-hidden');

	if (!flagToScroll) {
		flagToScroll = true;
		itemBlock1.scrollIntoView({ block: 'end', behavior: 'smooth' });

		flagToScroll = false;
	}
	setTimeout(() => {
		itemBlock1.classList.remove('reverse-wrapper');

		block.classList.remove('movable-block-active');

		const text = document.querySelector('#movable-text');
		text.classList.add('translate-x-[-134%]');
		text.classList.remove('translate-x-[-50%]');

		const textSec = document.querySelector('#movable-text-2');
		textSec.classList.remove('md:text-[124px]');

		const scroll = document.querySelector('#hidden-scroll');
		scroll.classList.add('hidden');

		scroll.classList.remove('scroll-image-active', 'flex');
		itemBlock2.classList.add('hidden');
	}, 800);

	setTimeout(() => {
		itemBlock1Margin.classList.add('mr-auto');
		itemBlock1Margin.classList.remove('mx-auto');
	}, 2000);
};
