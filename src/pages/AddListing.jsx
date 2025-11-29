import Stepper from '../features/addListing/Stepper.jsx';
import { NewListingFormProvider, useFormContext } from '../contexts/NewListingFormContext.jsx';

import Step1Basics from '../features/addListing/Step1Basics.jsx';
import Step2Location from '../features/addListing/Step2Location.jsx';
import Step3Photos from '../features/addListing/Step3Photos.jsx';
import Step4Tips from '../features/addListing/Step4Tips.jsx';
import Step5Review from '../features/addListing/Step5Review.jsx';
import NewListingNavigation from '../features/addListing/NewListNavigation.jsx';

function ListingContent() {
	const { step } = useFormContext();

	const renderStep = () => {
		switch (step) {
			case 0: return <Step1Basics />;
			case 1: return <Step2Location />;
			case 2: return <Step3Photos />;
			case 3: return <Step4Tips />;
			case 4: return <Step5Review />;
			default: return null;
		}
	};

	return (
		<div className="mx-auto max-w-4xl px-4">
			<h1 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
				Add a New Hidden Gem to Unhide Nepal
			</h1>
			<div className="mt-6">
				<Stepper current={step} />
			</div>

			<div className="mt-8 rounded-2xl bg-white p-2 sm:p-8 shadow-sm ring-1 ring-slate-200">
				{renderStep()}
				<NewListingNavigation />
			</div>
		</div>
	);
}


export default function NewListing() {
	return (
		<main className="mt-10 bg-slate-50 min-h-screen py-10">
			<NewListingFormProvider>
				<ListingContent />
			</NewListingFormProvider>
		</main>
	);
}