import i18n from '@/i18n.js'

//console.log("x", i18n.t('xxxxxxxxxxxxx'))
const p = i18n.t('SMART Pathways')
//console.log(p)

export const NATIOANAL_AVERAGE = "National average";

export const INITIAL_SCENARIO = {
    id: "",
    name: "Initial Scenario",
    dateOfPresentation: "",
    dateObj: {
        d: new Date().getDate(),
        m: new Date().getMonth() + 1,
        y: new Date().getFullYear()
    },
    input: {
        hydrusAspAmount: 1250, // B9
        goniotomyProcedureCost: 495, // B10

        // Assumptions
        surgeryDaysQuarterly: 24, // B12
        cataractSurgeriesPerDay: 20, // B13
        cataractSurgeryTime: 11.0, // B15
        proportionPatientsEligibleForHydrus: 0.1, // B17
        proportionHydrusPatientsExisting: 0.02, // B18,
    },

    locationInput: { // inputs from the other excel
        // cannot be changed by the user except by changing the state and the county
        cataractProfFee: 528.49, // B10
        cataractFacilityFee: 1183.7, // B11
        cataractWHydrusProfFee: 664.05, // B12
        cataractWHydrusFacilityFee: 3732.64, // B13
        goniotomyProfFee: 803.54, // B14
        goniotomyFacilityFee: 2045.03, // B15

        state: NATIOANAL_AVERAGE,
        county: "",
    },
    customerType: 'Hydrus v. Cataract',
    showFacilityFee: false
};

export const INITIAL_DATA = {
    input: {
        hydrusAspAmount: 1250, // B1
        goniotomyProcedureCost: 495, // B2

        // Assumptions
        surgeryDaysQuarterly: 24, // B3
        cataractSurgeriesPerDay: 20, // B4
        cataractSurgeryTime: 11.0, // B5
        proportionPatientsEligibleForHydrus: 0.1, // B17
        proportionHydrusPatientsExisting: 0.02, // B18

        hydrusEligiblePatientsQuarterlyNewInput: null,  // B22 input (have a calculated formula -> hydrusEligiblePatientsQuarterlyNew (used if hydrusEligiblePatientsQuarterlyNewInput is null))
        hydrusEligiblePatientsQuarterlyExistingInput: null,  // B23 input (have a calculated formula -> hydrusEligiblePatientsQuarterlyExisting (used if hydrusEligiblePatientsQuarterlyExistingInput is null))
    },


    locationInput: { // inputs from the other excel
        // cannot be changed by the user except by changing the state and the county
        cataractProfFee: 528.49, // B10
        cataractFacilityFee: 1183.7, // B11
        cataractWHydrusProfFee: 664.05, // B12
        cataractWHydrusFacilityFee: 3732.64, // B13
        goniotomyProfFee: 803.54, // B14
        goniotomyFacilityFee: 2045.03, // B15

        state: NATIOANAL_AVERAGE,
        county: "",
    },

    scenario: {}
};
