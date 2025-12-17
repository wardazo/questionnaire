// Tab section configurations for each comparison set
export const RESULTS_TAB_SECTIONS = {
  'vivity-puresee': [
    {
      id: 0,
      label: 'Spectacle independence & clarity',
      title: 'Spectacle independence:',
      subtitle: 'On a typical day, how often do you wear glasses for the following tasks?',
      questionIds: ['SET1_SPECTACLE_FAR', 'SET1_SPECTACLE_ARMS', 'SET1_SPECTACLE_NEAR'],
      taskLabels: ['Far away', "Arm's length", 'Up close'],
      chartType: 'bar',
      optionType: 'RADIO_OPTIONS'
    },
    {
      id: 1,
      label: 'Visual disturbances halos',
      title: 'Visual disturbances - Halos',
      subtitle: '',
      chartType: 'pie',
      questions: [
        { questionId: 'SET1_HALOS_FREQ', title: 'Do you experience halos in dim light?' },
        { questionId: 'SET1_HALOS_BOTHER', title: 'How bothersome are these with activities like night driving?' }
      ]
    },
    {
      id: 2,
      label: 'Visual disturbances Glare',
      title: 'Visual disturbances - Glare',
      subtitle: '',
      chartType: 'pie',
      questions: [
        { questionId: 'SET1_GLARE_FREQ', title: 'Do you experience glare?' },
        { questionId: 'SET1_GLARE_BOTHER', title: 'How bothersome are these with activities like night driving?' }
      ]
    },
    {
      id: 3,
      label: 'Visual acuity & patient satisfaction',
      title: 'Visual Acuity & Patient Satisfaction',
      subtitle: '',
      chartType: 'combined',
      acuityQuestionIds: ['SET1_ACUITY_UNVA40', 'SET1_ACUITY_UIVA66', 'SET1_ACUITY_UDVA'],
      acuityMeasurementLabels: [
        { name: 'UNVA', distance: '40 cm' },
        { name: 'UIVA', distance: '66 cm' },
        { name: 'UDVA', distance: '' }
      ],
      satisfactionQuestionId: 'SET1_SATISFACTION'
    }
  ],

  'panoptix-odyssey': [
    {
      id: 0,
      label: 'Spectacle independence',
      title: 'Spectacle independence:',
      subtitle: 'On a typical day, how often do you wear glasses for the following tasks?',
      chartType: 'bar',
      questionIds: ['SET2_SPECTACLE_FAR', 'SET2_SPECTACLE_INTERMEDIATE', 'SET2_SPECTACLE_NEAR', 'SET2_SPECTACLE_VERYNEAR'],
      taskLabels: ['Far', 'Intermediate', 'Near', 'Very Near'],
      optionType: 'RADIO_OPTIONS'
    },
    {
      id: 1,
      label: 'Clarity of Vision',
      title: 'Clarity of Vision',
      subtitle: 'Please rate the sharpness or clarity of your vision',
      chartType: 'bar',
      questionIds: ['SET2_CLARITY_BRIGHT', 'SET2_CLARITY_DIM'],
      taskLabels: ['Bright light', 'Dim light'],
      optionType: 'CLARITY_OPTIONS'
    },
    {
      id: 2,
      label: 'Visual disturbances - Halos',
      title: 'Visual disturbances - Halos',
      subtitle: '',
      chartType: 'pie',
      questions: [
        { questionId: 'SET2_HALOS_FREQ', title: 'Do you experience halos in dim light?' },
        { questionId: 'SET2_HALOS_BOTHER', title: 'How bothersome are these with activities like night driving?' }
      ]
    },
    {
      id: 3,
      label: 'Visual disturbances - Glare',
      title: 'Visual disturbances - Glare',
      subtitle: '',
      chartType: 'pie',
      questions: [
        { questionId: 'SET2_GLARE_FREQ', title: 'Do you experience glare?' },
        { questionId: 'SET2_GLARE_BOTHER', title: 'How bothersome are these with activities like night driving?' }
      ]
    },
    {
      id: 4,
      label: 'Visual disturbances - Starburst',
      title: 'Visual disturbances - Starburst',
      subtitle: '',
      chartType: 'pie',
      questions: [
        { questionId: 'SET2_STARBURSTS_FREQ', title: 'Do you experience halos in dim light?' },
        { questionId: 'SET2_STARBURSTS_BOTHER', title: 'Do you experience glare?' }
      ]
    },
    {
      id: 5,
      label: 'Visual acuity & patient satisfaction',
      title: 'Visual Acuity & Patient Satisfaction',
      subtitle: '',
      chartType: 'combined',
      acuityQuestionIds: ['SET2_ACUITY_UNVA33', 'SET2_ACUITY_UIVA66', 'SET2_ACUITY_UDVA_NEAR', 'SET2_ACUITY_UDVA'],
      acuityMeasurementLabels: [
        { name: 'UNVA', distance: '33 cm' },
        { name: 'UIVA', distance: '66 cm' },
        { name: 'UNIA', distance: '66 cm' },
        { name: 'UDVA', distance: '' }
      ],
      satisfactionQuestionId: 'SET2_SATISFACTION'
    }
  ],

  'panoptix-galaxy': [
    {
      id: 0,
      label: 'Spectacle independence',
      title: 'Spectacle independence:',
      subtitle: 'On a typical day, how often do you wear glasses for the following tasks?',
      chartType: 'bar',
      questionIds: ['SET2_SPECTACLE_FAR', 'SET2_SPECTACLE_INTERMEDIATE', 'SET2_SPECTACLE_NEAR', 'SET2_SPECTACLE_VERYNEAR'],
      taskLabels: ['Far', 'Intermediate', 'Near', 'Very Near'],
      optionType: 'RADIO_OPTIONS'
    },
    {
      id: 1,
      label: 'Clarity of Vision',
      title: 'Clarity of Vision',
      subtitle: 'Please rate the sharpness or clarity of your vision',
      chartType: 'bar',
      questionIds: ['SET3_CLARITY_BRIGHT', 'SET3_CLARITY_DIM', 'SET3_CLARITY_LOWCONTRAST'],
      taskLabels: ['Bright light', 'Dim light', 'Low contrast'],
      optionType: 'CLARITY_OPTIONS'
    },
    {
      id: 2,
      label: 'Visual disturbances - Ghosting',
      title: 'Visual disturbances - Ghosting',
      subtitle: '',
      chartType: 'pie',
      questions: [
        { questionId: 'SET3_SHADOW_GHOST', title: "Do you ever notice a 'shadow,' 'ghost,' or faint double image around objects even in good lighting?" },
        { questionId: 'SET3_HALOS_BOTHER', title: 'How bothersome are these with activities like night driving?' }
      ]
    },
    {
      id: 3,
      label: 'Visual acuity & patient satisfaction',
      title: 'Visual Acuity & Patient Satisfaction',
      subtitle: '',
      chartType: 'combined',
      acuityQuestionIds: ['SET2_ACUITY_UNVA33', 'SET2_ACUITY_UIVA66', 'SET2_ACUITY_UDVA_NEAR', 'SET2_ACUITY_UDVA'],
      acuityMeasurementLabels: [
        { name: 'UNVA', distance: '33 cm' },
        { name: 'UIVA', distance: '66 cm' },
        { name: 'UNIA', distance: '66 cm' },
        { name: 'UDVA', distance: '' }
      ],
      satisfactionQuestionId: 'SET2_SATISFACTION'
    }
  ]
};

// Chart color mapping for different answer types
export const CHART_COLORS = {
  // RADIO_OPTIONS (Never/Occasionally/Often/Always)
  never: '#02AF4B',          // Green
  occasionally: '#DEC9A5',   // Beige
  often: '#F36E20',          // Orange
  always: '#FF5722',         // Red

  // BOTHERSOME_OPTIONS
  not_at_all: '#02AF4B',     // Green (best)
  a_little: '#DEC9A5',       // Beige
  moderately: '#F36E20',     // Orange
  significantly: '#FF5722',  // Red (worst)

  // CLARITY_OPTIONS
  very_clear: '#02AF4B',     // Green (best)
  somewhat_clear: '#DEC9A5', // Beige
  slightly_blurry: '#F36E20',// Orange
  very_blurry: '#03AEEE',    // Blue (worst)

  // SCALE options (0-10)
  '0': '#FF5722', '1': '#FF7043', '2': '#FF8A65',
  '3': '#FFAB91', '4': '#FFCCBC', '5': '#D2B48C',
  '6': '#AED581', '7': '#9CCC65', '8': '#8BC34A',
  '9': '#66BB6A', '10': '#4CAF50',

  // Visual acuity (simplified - can add more)
  '20/20': '#4CAF50',
  '20/25': '#8BC34A',
  '20/30': '#AED581',
  '20/40': '#D2B48C',
  '20/50': '#ffac1c',
  '20/60': '#FF8A65',
  '20/80': '#FF7043',
  '20/100': '#FF5722',

  // Additional common answer values
  evening: '#ffac1c',
  watching_tv: '#D2B48C',
  low_light: '#FF8A65',
  no_specific_time: '#4CAF50'
};
