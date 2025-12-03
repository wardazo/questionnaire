// Tab section configurations for each comparison set
export const RESULTS_TAB_SECTIONS = {
  'vivity-puresee': [
    {
      id: 0,
      label: 'Spectacle independence and clarity',
      title: 'Spectacle independence:',
      subtitle: 'On a typical day, how often do you wear glasses for the following tasks?',
      questionIds: ['SET1_SPECTACLE_FAR', 'SET1_SPECTACLE_ARMS', 'SET1_SPECTACLE_NEAR'],
      taskLabels: ['Far', 'Intermediate', 'Near'],
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
      chartType: 'bar',
      questionIds: ['SET1_ACUITY_UNVA40', 'SET1_ACUITY_UIVA66', 'SET1_ACUITY_UDVA', 'SET1_SATISFACTION'],
      taskLabels: ['UNVA (40cm)', 'UIVA (66cm)', 'UDVA', 'Satisfaction'],
      optionType: 'MIXED'
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
      label: 'Visual quality - clarity',
      title: 'Visual Quality – Clarity of Vision',
      subtitle: 'Please rate the sharpness or clarity of your vision',
      chartType: 'bar',
      questionIds: ['SET2_CLARITY_BRIGHT', 'SET2_CLARITY_DIM'],
      taskLabels: ['Bright light', 'Dim light'],
      optionType: 'CLARITY_OPTIONS'
    },
    {
      id: 2,
      label: 'Visual disturbances',
      title: 'Visual disturbances:',
      subtitle: '',
      chartType: 'pie',
      questions: [
        { questionId: 'SET2_HALOS_FREQ', title: 'Do you experience halos in dim light?' },
        { questionId: 'SET2_HALOS_BOTHER', title: 'How bothersome are these with activities like night driving?' },
        { questionId: 'SET2_GLARE_FREQ', title: 'Do you experience glare?' },
        { questionId: 'SET2_GLARE_BOTHER', title: 'How bothersome are these with activities like night driving?' }
      ]
    },
    {
      id: 3,
      label: 'Overall satisfaction',
      title: 'Overall Vision Experience:',
      subtitle: 'Satisfaction with vision after surgery',
      chartType: 'bar',
      questionIds: ['SET2_SATISFACTION'],
      taskLabels: ['Satisfaction (0-10)'],
      optionType: 'SCALE'
    },
    {
      id: 4,
      label: 'Visual acuity measurements',
      title: 'Visual Acuity Measurements',
      subtitle: 'UNVA, UIVA, UDVA measurements',
      chartType: 'bar',
      questionIds: ['SET2_ACUITY_UNVA33', 'SET2_ACUITY_UIVA66', 'SET2_ACUITY_UDVA_NEAR', 'SET2_ACUITY_UDVA'],
      taskLabels: ['UNVA (33cm)', 'UIVA (66cm)', 'UDVA (Near)', 'UDVA'],
      optionType: 'VISUAL_ACUITY'
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
      label: 'Visual quality - clarity',
      title: 'Visual Quality – Clarity of Vision',
      subtitle: 'Please rate the sharpness or clarity of your vision',
      chartType: 'bar',
      questionIds: ['SET3_CLARITY_BRIGHT', 'SET3_CLARITY_DIM', 'SET3_CLARITY_LOWCONTRAST'],
      taskLabels: ['Bright light', 'Dim light', 'Low contrast'],
      optionType: 'CLARITY_OPTIONS'
    },
    {
      id: 2,
      label: 'Visual disturbances',
      title: 'Visual disturbances:',
      subtitle: '',
      chartType: 'pie',
      questions: [
        { questionId: 'SET3_SHADOW_GHOST', title: "Do you ever notice a 'shadow,' 'ghost,' or faint double image around objects even in good lighting?" },
        { questionId: 'SET3_HALOS_BOTHER', title: 'How bothersome are these with activities like night driving?' }
      ]
    },
    {
      id: 3,
      label: 'Overall satisfaction',
      title: 'Overall Vision Experience:',
      subtitle: 'Satisfaction with vision after surgery',
      chartType: 'bar',
      questionIds: ['SET2_SATISFACTION'],
      taskLabels: ['Satisfaction (0-10)'],
      optionType: 'SCALE'
    },
    {
      id: 4,
      label: 'Visual acuity measurements',
      title: 'Visual Acuity Measurements',
      subtitle: 'UNVA, UIVA, UDVA measurements',
      chartType: 'bar',
      questionIds: ['SET2_ACUITY_UNVA33', 'SET2_ACUITY_UIVA66', 'SET2_ACUITY_UDVA_NEAR', 'SET2_ACUITY_UDVA'],
      taskLabels: ['UNVA (33cm)', 'UIVA (66cm)', 'UDVA (Near)', 'UDVA'],
      optionType: 'VISUAL_ACUITY'
    }
  ]
};

// Chart color mapping for different answer types
export const CHART_COLORS = {
  // RADIO_OPTIONS (Never/Occasionally/Often/Always)
  never: '#003595',          // Blue
  occasionally: '#D2B48C',   // Tan/Beige
  often: '#ffac1c',          // Orange
  always: '#4CAF50',         // Green

  // BOTHERSOME_OPTIONS
  not_at_all: '#4CAF50',
  a_little: '#D2B48C',
  moderately: '#ffac1c',
  significantly: '#FF5722',

  // CLARITY_OPTIONS
  very_clear: '#4CAF50',
  somewhat_clear: '#D2B48C',
  slightly_blurry: '#ffac1c',
  very_blurry: '#FF5722',

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
