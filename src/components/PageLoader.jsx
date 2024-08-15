const PageLoader = () => {
	return (
		<div className="w-full h-screen relative top-0 left-0">
			<div className="absolute left-1/2 top-20 md:top-28 -translate-x-1/2">
				<div className="text-center w-[120px] h-[42px] page-loader">
					<div className="react1"></div>
					<div className="react2"></div>
					<div className="react3"></div>
					<div className="react4"></div>
					<div className="react5"></div>
				</div>
				<p className="text-sm text-center font-normal mt-4">Please wait a moment...</p>
			</div>
		</div>
	);
};

export default PageLoader;
