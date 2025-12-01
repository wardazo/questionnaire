// Questionnaire configurations for all 6 product types

// ============================================================================
// SHARED OPTIONS
// ============================================================================

// Standard radio button options (Never/Occasionally/Often/Always)
const RADIO_OPTIONS = [
  { label: 'Never', value: 'never' },
  { label: 'Occasionally', value: 'occasionally' },
  { label: 'Often', value: 'often' },
  { label: 'Always', value: 'always' }
];

// Bothersome scale options
const BOTHERSOME_OPTIONS = [
  { label: 'Not at all', value: 'not_at_all' },
  { label: 'A little', value: 'a_little' },
  { label: 'Moderately', value: 'moderately' },
  { label: 'Significantly', value: 'significantly' }
];

// Clarity of vision options
const CLARITY_OPTIONS = [
  { label: 'Very Clear', value: 'very_clear' },
  { label: 'Somewhat Clear', value: 'somewhat_clear' },
  { label: 'Slightly Blurry', value: 'slightly_blurry' },
  { label: 'Very Blurry', value: 'very_blurry' }
];

// Visual acuity measurement options
const VISUAL_ACUITY_OPTIONS = [
  '20/20', '20/25', '20/30', '20/40', '20/50', '20/60', '20/80', '20/100'
];

// ============================================================================
// QUESTIONNAIRE SET 1: VIVITY & PURESEE (4 PARTS)
// ============================================================================

const SET1_PART1_TASKS = [
  {
    key: 'far',
    questionId: 'SET1_SPECTACLE_FAR',
    label: 'Far away',
    description: '(e.g., watching TV, seeing street signs, recognizing faces).'
  },
  {
    key: 'armsLength',
    questionId: 'SET1_SPECTACLE_ARMS',
    label: "Arm's length",
    description: '(e.g., seeing the prices of goods on the dashboard of a car).'
  },
  {
    key: 'upClose',
    questionId: 'SET1_SPECTACLE_NEAR',
    label: 'Up close',
    description: '(e.g., reading a book or newspaper, or while knitting).'
  }
];

const SET1_PART2_QUESTIONS = [
  {
    key: 'halos',
    questionId: 'SET1_HALOS_FREQ',
    text: 'Do you experience halos in dim light?',
    options: RADIO_OPTIONS
  },
  {
    key: 'halosBothersome',
    questionId: 'SET1_HALOS_BOTHER',
    text: 'How bothersome are these for your day-to-day activities i.e. night driving?',
    options: BOTHERSOME_OPTIONS
  },
  {
    key: 'glare',
    questionId: 'SET1_GLARE_FREQ',
    text: 'Do you experience glare?',
    options: RADIO_OPTIONS
  },
  {
    key: 'glareBothersome',
    questionId: 'SET1_GLARE_BOTHER',
    text: 'How bothersome are these for your day-to-day activities i.e. night driving?',
    options: BOTHERSOME_OPTIONS
  }
];

const SET1_PART3_QUESTIONS = [
  {
    key: 'satisfaction',
    questionId: 'SET1_SATISFACTION',
    text: 'On a scale of 0 to 10, how satisfied are you with your vision after surgery?'
  }
];

const SET1_PART4_MEASUREMENTS = [
  {
    key: 'unva40',
    questionId: 'SET1_ACUITY_UNVA40',
    label: 'UNVA (40cm)',
    icon: require('@/assets/img/icon-phone.svg'),
    options: VISUAL_ACUITY_OPTIONS
  },
  {
    key: 'uiva66',
    questionId: 'SET1_ACUITY_UIVA66',
    label: 'UIVA (66cm)',
    icon: require('@/assets/img/icon-laptop.svg'),
    options: VISUAL_ACUITY_OPTIONS
  },
  {
    key: 'udva',
    questionId: 'SET1_ACUITY_UDVA',
    label: 'UDVA',
    icon: require('@/assets/img/icon-steering.svg'),
    options: VISUAL_ACUITY_OPTIONS
  }
];

// ============================================================================
// QUESTIONNAIRE SET 2: PANOPTIX & ODYSSEY (5 PARTS)
// ============================================================================

const SET2_PART1_TASKS = [
  {
    key: 'far',
    questionId: 'SET2_SPECTACLE_FAR',
    label: 'Far',
    description: '(Driving, watching TV).'
  },
  {
    key: 'intermediate',
    questionId: 'SET2_SPECTACLE_INTERMEDIATE',
    label: 'Intermediate',
    description: '(Computer, car dashboard).'
  },
  {
    key: 'near',
    questionId: 'SET2_SPECTACLE_NEAR',
    label: 'Near',
    description: '(Reading, Texting, Phone).'
  },
  {
    key: 'veryNear',
    questionId: 'SET2_SPECTACLE_VERYNEAR',
    label: 'Very Near',
    description: '(Ingredient list, drug indications).'
  }
];

const SET2_PART2_TASKS = [
  {
    key: 'brightLight',
    questionId: 'SET2_CLARITY_BRIGHT',
    label: 'Bright light',
    description: ''
  },
  {
    key: 'dimLight',
    questionId: 'SET2_CLARITY_DIM',
    label: 'Dim light',
    description: ''
  }
];

const SET2_PART3_QUESTIONS = [
  {
    key: 'halos',
    questionId: 'SET2_HALOS_FREQ',
    text: 'Do you experience halos in dim light?',
    options: RADIO_OPTIONS
  },
  {
    key: 'halosBothersome',
    questionId: 'SET2_HALOS_BOTHER',
    text: 'How bothersome are these for your day-to-day activities i.e. night driving?',
    options: BOTHERSOME_OPTIONS
  },
  {
    key: 'glare',
    questionId: 'SET2_GLARE_FREQ',
    text: 'Do you experience glare?',
    options: RADIO_OPTIONS
  },
  {
    key: 'glareBothersome',
    questionId: 'SET2_GLARE_BOTHER',
    text: 'How bothersome are these for your day-to-day activities i.e. night driving?',
    options: BOTHERSOME_OPTIONS
  }
];

const SET2_PART4_QUESTIONS = [
  {
    key: 'satisfaction',
    questionId: 'SET2_SATISFACTION',
    text: 'On a scale of 0 to 10, how satisfied are you with your vision after surgery?'
  }
];

const SET2_PART5_MEASUREMENTS = [
  {
    key: 'unva33',
    questionId: 'SET2_ACUITY_UNVA33',
    label: 'UNVA (33cm)',
    icon: require('@/assets/img/icon-phone.svg'),
    options: VISUAL_ACUITY_OPTIONS
  },
  {
    key: 'uiva66',
    questionId: 'SET2_ACUITY_UIVA66',
    label: 'UIVA (66cm)',
    icon: require('@/assets/img/icon-laptop.svg'),
    options: VISUAL_ACUITY_OPTIONS
  },
  {
    key: 'udvaNear',
    questionId: 'SET2_ACUITY_UDVA_NEAR',
    label: 'UDVA (Near)',
    icon: require('@/assets/img/icon-steering.svg'),
    options: VISUAL_ACUITY_OPTIONS
  },
  {
    key: 'udva',
    questionId: 'SET2_ACUITY_UDVA',
    label: 'UDVA',
    icon: require('@/assets/img/icon-steering.svg'),
    options: VISUAL_ACUITY_OPTIONS
  }
];

// ============================================================================
// QUESTIONNAIRE SET 3: PANOPTIX & GALAXY (5 PARTS)
// ============================================================================

const SET3_PART2_TASKS = [
  {
    key: 'brightLight',
    questionId: 'SET3_CLARITY_BRIGHT',
    label: 'Bright light',
    description: ''
  },
  {
    key: 'dimLight',
    questionId: 'SET3_CLARITY_DIM',
    label: 'Dim light',
    description: ''
  },
  {
    key: 'lowContrast',
    questionId: 'SET3_CLARITY_LOWCONTRAST',
    label: 'Low contrast',
    description: '(e.g. fog, dusk).'
  }
];

const SET3_PART3_QUESTIONS = [
  {
    key: 'shadowGhost',
    questionId: 'SET3_SHADOW_GHOST',
    text: "Do you ever notice a 'shadow,' 'ghost,' or faint double image around objects even in good lighting?",
    options: RADIO_OPTIONS
  },
  {
    key: 'halosBothersome',
    questionId: 'SET3_HALOS_BOTHER',
    text: 'How bothersome are these for your day-to-day activities i.e. night driving?',
    options: BOTHERSOME_OPTIONS
  },
  {
    key: 'glare',
    questionId: 'SET3_GLARE_WHEN',
    text: 'If yes, when do you notice it the most?',
    options: RADIO_OPTIONS
  },
  {
    key: 'nightOnly',
    questionId: 'SET3_NIGHT_WHEN',
    text: 'If yes, when do you notice it the most? (great to good lighting)',
    options: [
      { label: 'Evening', value: 'evening' },
      { label: 'Watching TV', value: 'watching_tv' },
      { label: 'In low light conditions', value: 'low_light' },
      { label: 'No specific time', value: 'no_specific_time' }
    ]
  }
];

// ============================================================================
// QUESTIONNAIRE CONFIGURATIONS
// ============================================================================

/**
 * All questionnaire configurations indexed by type
 */
export const QUESTIONNAIRE_CONFIGS = {
  // SET 1: VIVITY & PURESEE (4 parts)
  vivity: {
    type: 'vivity',
    productInfo: {
      name: 'Vivity<sup>®</sup> and<br>PureSee<sup>*</sup>',
      subtitle: 'Vivity<sup>®</sup> / Vivity<sup>®</sup> Toric'
    },
    totalParts: 4,
    parts: {
      part1: {
        component: 'QuestionRadio',
        title: 'Spectacle independence:',
        questionText: 'On a typical day, how often do you wear glasses for the following tasks?',
        tasks: SET1_PART1_TASKS,
        options: RADIO_OPTIONS
      },
      part2: {
        component: 'QuestionRadio',
        title: 'Visual disturbances:',
        questions: SET1_PART2_QUESTIONS
      },
      part3: {
        component: 'QuestionScale',
        title: 'Overall Vision Experience:',
        questions: SET1_PART3_QUESTIONS,
        scaleMin: 0,
        scaleMax: 10,
        scaleLabel: '(0 = very dissatisfied, 10 = extremely satisfied)'
      },
      part4: {
        component: 'QuestionVisualAcuity',
        title: 'Visual Acuity Measurements',
        measurements: SET1_PART4_MEASUREMENTS
      }
    }
  },

  puresee: {
    type: 'puresee',
    productInfo: {
      name: 'Vivity<sup>®</sup> and<br>PureSee<sup>*</sup>',
      subtitle: 'PureSee<sup>*</sup> / PureSee<sup>*</sup> Toric'
    },
    totalParts: 4,
    parts: {
      part1: {
        component: 'QuestionRadio',
        title: 'Spectacle independence:',
        questionText: 'On a typical day, how often do you wear glasses for the following tasks?',
        tasks: SET1_PART1_TASKS,
        options: RADIO_OPTIONS
      },
      part2: {
        component: 'QuestionRadio',
        title: 'Visual disturbances:',
        questions: SET1_PART2_QUESTIONS
      },
      part3: {
        component: 'QuestionScale',
        title: 'Overall Vision Experience:',
        questions: SET1_PART3_QUESTIONS,
        scaleMin: 0,
        scaleMax: 10,
        scaleLabel: '(0 = very dissatisfied, 10 = extremely satisfied)'
      },
      part4: {
        component: 'QuestionVisualAcuity',
        title: 'Visual Acuity Measurements',
        measurements: SET1_PART4_MEASUREMENTS
      }
    }
  },

  // SET 2: PANOPTIX & ODYSSEY (5 parts)
  panoptix1: {
    type: 'panoptix1',
    productInfo: {
      name: 'PanOptix<sup>®</sup> and<br>Odyssey<sup>*</sup>',
      subtitle: 'PanOptix<sup>®</sup> / PanOptix<sup>®</sup> Toric'
    },
    totalParts: 5,
    parts: {
      part1: {
        component: 'QuestionRadio',
        title: 'Spectacle independence:',
        questionText: 'On a typical day, how often do you wear glasses for the following tasks?',
        tasks: SET2_PART1_TASKS,
        options: RADIO_OPTIONS
      },
      part2: {
        component: 'QuestionRadio',
        title: 'Visual Quality – Clarity of Vision',
        questionText: 'Please rate the sharpness or clarity of your vision in bright light, dim light.',
        tasks: SET2_PART2_TASKS,
        options: CLARITY_OPTIONS
      },
      part3: {
        component: 'QuestionRadio',
        title: 'Visual disturbances:',
        questions: SET2_PART3_QUESTIONS
      },
      part4: {
        component: 'QuestionScale',
        title: 'Overall Vision Experience:',
        questions: SET2_PART4_QUESTIONS,
        scaleMin: 0,
        scaleMax: 10,
        scaleLabel: '(0 = very dissatisfied, 10 = extremely satisfied)'
      },
      part5: {
        component: 'QuestionVisualAcuity',
        title: 'Visual Acuity Measurements',
        measurements: SET2_PART5_MEASUREMENTS
      }
    }
  },

  odyssey: {
    type: 'odyssey',
    productInfo: {
      name: 'PanOptix<sup>®</sup> and<br>Odyssey<sup>*</sup>',
      subtitle: 'Odyssey<sup>*</sup> / Odyssey<sup>*</sup> Toric'
    },
    totalParts: 5,
    parts: {
      part1: {
        component: 'QuestionRadio',
        title: 'Spectacle independence:',
        questionText: 'On a typical day, how often do you wear glasses for the following tasks?',
        tasks: SET2_PART1_TASKS,
        options: RADIO_OPTIONS
      },
      part2: {
        component: 'QuestionRadio',
        title: 'Visual Quality – Clarity of Vision',
        questionText: 'Please rate the sharpness or clarity of your vision in bright light, dim light.',
        tasks: SET2_PART2_TASKS,
        options: CLARITY_OPTIONS
      },
      part3: {
        component: 'QuestionRadio',
        title: 'Visual disturbances:',
        questions: SET2_PART3_QUESTIONS
      },
      part4: {
        component: 'QuestionScale',
        title: 'Overall Vision Experience:',
        questions: SET2_PART4_QUESTIONS,
        scaleMin: 0,
        scaleMax: 10,
        scaleLabel: '(0 = very dissatisfied, 10 = extremely satisfied)'
      },
      part5: {
        component: 'QuestionVisualAcuity',
        title: 'Visual Acuity Measurements',
        measurements: SET2_PART5_MEASUREMENTS
      }
    }
  },

  // SET 3: PANOPTIX & GALAXY (5 parts with variations)
  panoptix2: {
    type: 'panoptix2',
    productInfo: {
      name: 'PanOptix<sup>®</sup> and<br>Galaxy<sup>*</sup>',
      subtitle: 'PanOptix<sup>®</sup> / PanOptix<sup>®</sup> Toric'
    },
    totalParts: 5,
    parts: {
      part1: {
        component: 'QuestionRadio',
        title: 'Spectacle independence:',
        questionText: 'On a typical day, how often do you wear glasses for the following tasks?',
        tasks: SET2_PART1_TASKS,
        options: RADIO_OPTIONS
      },
      part2: {
        component: 'QuestionRadio',
        title: 'Visual Quality – Clarity of Vision',
        questionText: 'Please rate the sharpness or clarity of your vision in bright light, dim light.',
        tasks: SET3_PART2_TASKS,
        options: CLARITY_OPTIONS
      },
      part3: {
        component: 'QuestionRadio',
        title: 'Visual disturbances:',
        questions: SET3_PART3_QUESTIONS
      },
      part4: {
        component: 'QuestionScale',
        title: 'Overall Vision Experience:',
        questions: SET2_PART4_QUESTIONS,
        scaleMin: 0,
        scaleMax: 10,
        scaleLabel: '(0 = very dissatisfied, 10 = extremely satisfied)'
      },
      part5: {
        component: 'QuestionVisualAcuity',
        title: 'Visual Acuity Measurements',
        measurements: SET2_PART5_MEASUREMENTS
      }
    }
  },

  galaxy: {
    type: 'galaxy',
    productInfo: {
      name: 'PanOptix<sup>®</sup> and<br>Galaxy<sup>*</sup>',
      subtitle: 'Galaxy<sup>*</sup> / Galaxy<sup>*</sup> Toric'
    },
    totalParts: 5,
    parts: {
      part1: {
        component: 'QuestionRadio',
        title: 'Spectacle independence:',
        questionText: 'On a typical day, how often do you wear glasses for the following tasks?',
        tasks: SET2_PART1_TASKS,
        options: RADIO_OPTIONS
      },
      part2: {
        component: 'QuestionRadio',
        title: 'Visual Quality – Clarity of Vision',
        questionText: 'Please rate the sharpness or clarity of your vision in bright light, dim light.',
        tasks: SET3_PART2_TASKS,
        options: CLARITY_OPTIONS
      },
      part3: {
        component: 'QuestionRadio',
        title: 'Visual disturbances:',
        questions: SET3_PART3_QUESTIONS
      },
      part4: {
        component: 'QuestionScale',
        title: 'Overall Vision Experience:',
        questions: SET2_PART4_QUESTIONS,
        scaleMin: 0,
        scaleMax: 10,
        scaleLabel: '(0 = very dissatisfied, 10 = extremely satisfied)'
      },
      part5: {
        component: 'QuestionVisualAcuity',
        title: 'Visual Acuity Measurements',
        measurements: SET2_PART5_MEASUREMENTS
      }
    }
  }
};

/**
 * List of all valid questionnaire types
 */
export const QUESTIONNAIRE_TYPES = ['vivity', 'puresee', 'panoptix1', 'odyssey', 'panoptix2', 'galaxy'];
