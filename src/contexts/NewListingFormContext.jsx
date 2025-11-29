import { createContext, useContext } from 'react';
import useNewListingForm from '../hooks/useNewListingForm.jsx'

const NewListingFormContext = createContext(null);

export function useFormContext() {
    const context = useContext(NewListingFormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a NewListingFormProvider');
    }
    return context;
}

export function NewListingFormProvider({ children }) {
    const formManagement = useNewListingForm(); 

    return (
        <NewListingFormContext.Provider value={formManagement}>
            {children}
        </NewListingFormContext.Provider>
    );
}