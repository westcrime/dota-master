'use client';
import './carousel.css';

const Carousel = () => {
  return (
    <div className="carousel w-[40%]">
			<div className="change_outer">
				<div className="change_inner">
					<div className="element">laning</div>
					<div className="element">heros</div>
					<div className="element">farming</div>
					<div className="element">builds</div>
					<div className="element">laning</div>
				</div>
			</div>
		</div>
  );
};

export default Carousel;