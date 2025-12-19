// Questionnaire configurations for all 6 product types
import i18n from '@/i18n';

// ============================================================================
// SHARED OPTIONS
// ============================================================================

// Standard radio button options (Never/Occasionally/Often/Always)
const RADIO_OPTIONS = [
  { label: i18n.global.t('Never'), value: 'never' },
  { label: i18n.global.t('Occasionally'), value: 'occasionally' },
  { label: i18n.global.t('Often'), value: 'often' },
  { label: i18n.global.t('Always'), value: 'always' }
];

// Bothersome scale options
const BOTHERSOME_OPTIONS = [
  { label: i18n.global.t('Not at all'), value: 'not_at_all' },
  { label: i18n.global.t('A little'), value: 'a_little' },
  { label: i18n.global.t('Moderately'), value: 'moderately' },
  { label: i18n.global.t('Significantly'), value: 'significantly' }
];

// Clarity of vision options
const CLARITY_OPTIONS = [
  { label: i18n.global.t('Very Clear'), value: 'very_clear' },
  { label: i18n.global.t('Somewhat Clear'), value: 'somewhat_clear' },
  { label: i18n.global.t('Slightly Blurry'), value: 'slightly_blurry' },
  { label: i18n.global.t('Very Blurry'), value: 'very_blurry' }
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
    label: i18n.global.t('Far away'),
    description: i18n.global.t('(e.g., watching TV, seeing street signs, recognizing faces).')
  },
  {
    key: 'armsLength',
    questionId: 'SET1_SPECTACLE_ARMS',
    label: i18n.global.t("Arm's length"),
    description: i18n.global.t('(e.g., seeing the prices of goods on the dashboard of a car).')
  },
  {
    key: 'upClose',
    questionId: 'SET1_SPECTACLE_NEAR',
    label: i18n.global.t('Up close'),
    description: i18n.global.t('(e.g., reading a book or newspaper, or while eating).')
  }
];

const SET1_PART2_QUESTIONS = [
  {
    key: 'halos',
    questionId: 'SET1_HALOS_FREQ',
    text: i18n.global.t('Do you experience halos in dim light?'),
    options: RADIO_OPTIONS
  },
  {
    key: 'halosBothersome',
    questionId: 'SET1_HALOS_BOTHER',
    text: i18n.global.t('How bothersome are these for your day-to-day activities (i.e. night driving)?'),
    options: BOTHERSOME_OPTIONS
  },
  {
    key: 'glare',
    questionId: 'SET1_GLARE_FREQ',
    text: i18n.global.t('Do you experience glare?'),
    options: RADIO_OPTIONS
  },
  {
    key: 'glareBothersome',
    questionId: 'SET1_GLARE_BOTHER',
    text: i18n.global.t('How bothersome are these for your day-to-day activities (i.e. night driving)?'),
    options: BOTHERSOME_OPTIONS
  }
];

const SET1_PART3_QUESTIONS = [
  {
    key: 'satisfaction',
    questionId: 'SET1_SATISFACTION',
    text: i18n.global.t('On a scale of 0 to 10, how satisfied are you with your vision after surgery?')
  }
];

const SET1_PART4_MEASUREMENTS = [
  {
    key: 'unva40',
    questionId: 'SET1_ACUITY_UNVA40',
    label: i18n.global.t('UNVA (40cm)'),
    icon: require('@/assets/img/icon-phone.svg'),
    options: VISUAL_ACUITY_OPTIONS
  },
  {
    key: 'uiva66',
    questionId: 'SET1_ACUITY_UIVA66',
    label: i18n.global.t('UIVA (66cm)'),
    icon: require('@/assets/img/icon-laptop.svg'),
    options: VISUAL_ACUITY_OPTIONS
  },
  {
    key: 'udva',
    questionId: 'SET1_ACUITY_UDVA',
    label: i18n.global.t('UDVA'),
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
    label: i18n.global.t('Far'),
    description: i18n.global.t('(Driving, watching TV).')
  },
  {
    key: 'intermediate',
    questionId: 'SET2_SPECTACLE_INTERMEDIATE',
    label: i18n.global.t('Intermediate'),
    description: i18n.global.t('(Computer, car dashboard).')
  },
  {
    key: 'near',
    questionId: 'SET2_SPECTACLE_NEAR',
    label: i18n.global.t('Near'),
    description: i18n.global.t('(Reading, Texting, Phone).')
  },
  {
    key: 'veryNear',
    questionId: 'SET2_SPECTACLE_VERYNEAR',
    label: i18n.global.t('Very Near'),
    description: i18n.global.t('(Ingredient list, drug indications).')
  }
];

const SET2_PART2_TASKS = [
  {
    key: 'brightLight',
    questionId: 'SET2_CLARITY_BRIGHT',
    label: i18n.global.t('Bright light'),
    description: ''
  },
  {
    key: 'dimLight',
    questionId: 'SET2_CLARITY_DIM',
    label: i18n.global.t('Dim light'),
    description: ''
  }
];

const SET2_PART3_QUESTIONS = [
  {
    key: 'halos',
    questionId: 'SET2_HALOS_FREQ',
    text: i18n.global.t('Do you experience halos in dim light?'),
    options: RADIO_OPTIONS
  },
  {
    key: 'halosBothersome',
    questionId: 'SET2_HALOS_BOTHER',
    text: i18n.global.t('How bothersome are these for your day-to-day activities (i.e. night driving)?'),
    options: BOTHERSOME_OPTIONS
  },
  {
    key: 'glare',
    questionId: 'SET2_GLARE_FREQ',
    text: i18n.global.t('Do you experience glare?'),
    options: RADIO_OPTIONS
  },
  {
    key: 'glareBothersome',
    questionId: 'SET2_GLARE_BOTHER',
    text: i18n.global.t('How bothersome are these for your day-to-day activities (i.e. night driving)?'),
    options: BOTHERSOME_OPTIONS
  },
  {
    key: 'starbursts',
    questionId: 'SET2_STARBURSTS_FREQ',
    text: i18n.global.t('Do you experience starbursts?'),
    options: RADIO_OPTIONS
  },
  {
    key: 'starburstsBothersome',
    questionId: 'SET2_STARBURSTS_BOTHER',
    text: i18n.global.t('How bothersome are these for your day-to-day activities (i.e. night driving)?'),
    options: BOTHERSOME_OPTIONS
  }
];

const SET2_PART4_QUESTIONS = [
  {
    key: 'satisfaction',
    questionId: 'SET2_SATISFACTION',
    text: i18n.global.t('On a scale of 0 to 10, how satisfied are you with your vision after surgery?')
  }
];

const SET2_PART5_MEASUREMENTS = [
  {
    key: 'unva33',
    questionId: 'SET2_ACUITY_UNVA33',
    label: i18n.global.t('UNVA (33cm)'),
    icon: require('@/assets/img/icon-phone.svg'),
    options: VISUAL_ACUITY_OPTIONS
  },
  {
    key: 'uiva66',
    questionId: 'SET2_ACUITY_UIVA66',
    label: i18n.global.t('UIVA (66cm)'),
    icon: require('@/assets/img/icon-laptop.svg'),
    options: VISUAL_ACUITY_OPTIONS
  },
  {
    key: 'udvaNear',
    questionId: 'SET2_ACUITY_UDVA_NEAR',
    label: i18n.global.t('UDVA (Near)'),
    icon: require('@/assets/img/icon-steering.svg'),
    options: VISUAL_ACUITY_OPTIONS
  },
  {
    key: 'udva',
    questionId: 'SET2_ACUITY_UDVA',
    label: i18n.global.t('UDVA'),
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
    label: i18n.global.t('Bright light'),
    description: ''
  },
  {
    key: 'dimLight',
    questionId: 'SET3_CLARITY_DIM',
    label: i18n.global.t('Dim light'),
    description: ''
  },
  {
    key: 'lowContrast',
    questionId: 'SET3_CLARITY_LOWCONTRAST',
    label: i18n.global.t('Low contrast'),
    description: i18n.global.t('(e.g. fog, dusk).')
  }
];

const SET3_PART3_QUESTIONS = [
  {
    key: 'shadowGhost',
    questionId: 'SET3_SHADOW_GHOST',
    text: i18n.global.t("Do you ever notice a 'shadow,' 'ghost,' or faint double image around objects even in good lighting?"),
    options: RADIO_OPTIONS
  },
  {
    key: 'glare',
    questionId: 'SET3_GLARE_WHEN',
    text: i18n.global.t('If yes, when do you notice it the most?'),
    options: [
      { label: i18n.global.t('Reading'), value: 'reading' },
      { label: i18n.global.t('Watching TV'), value: 'watching_tv' },
      { label: i18n.global.t('In low light conditions'), value: 'low_light' },
      { label: i18n.global.t('No specific time'), value: 'no_specific_time' }
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
      name: i18n.global.t('Vivity<sup>®</sup> and<br>PureSee<sup>*</sup>'),
      subtitle: i18n.global.t('Vivity<sup>®</sup><br>Vivity<sup>®</sup> Toric')
    },
    totalParts: 4,
    parts: {
      part1: {
        component: 'QuestionRadio',
        title: i18n.global.t('Spectacle independence:'),
        questionText: i18n.global.t('On a typical day, how often do you wear glasses for the following tasks?'),
        tasks: SET1_PART1_TASKS,
        options: RADIO_OPTIONS
      },
      part2: {
        component: 'QuestionRadio',
        title: i18n.global.t('Visual disturbances:'),
        questions: SET1_PART2_QUESTIONS
      },
      part3: {
        component: 'QuestionScale',
        title: i18n.global.t('Overall Vision Experience:'),
        questions: SET1_PART3_QUESTIONS,
        scaleMin: 0,
        scaleMax: 10,
        scaleLabel: i18n.global.t('(0 = very dissatisfied, 10 = extremely satisfied)')
      },
      part4: {
        component: 'QuestionVisualAcuity',
        title: i18n.global.t('Visual Acuity Measurements'),
        measurements: SET1_PART4_MEASUREMENTS
      }
    }
  },

  puresee: {
    type: 'puresee',
    productInfo: {
      name: i18n.global.t('Vivity<sup>®</sup> and<br>PureSee<sup>*</sup>'),
      subtitle: i18n.global.t('PureSee<sup>*</sup><br>PureSee<sup>*</sup> Toric')
    },
    totalParts: 4,
    parts: {
      part1: {
        component: 'QuestionRadio',
        title: i18n.global.t('Spectacle independence:'),
        questionText: i18n.global.t('On a typical day, how often do you wear glasses for the following tasks?'),
        tasks: SET1_PART1_TASKS,
        options: RADIO_OPTIONS
      },
      part2: {
        component: 'QuestionRadio',
        title: i18n.global.t('Visual disturbances:'),
        questions: SET1_PART2_QUESTIONS
      },
      part3: {
        component: 'QuestionScale',
        title: i18n.global.t('Overall Vision Experience:'),
        questions: SET1_PART3_QUESTIONS,
        scaleMin: 0,
        scaleMax: 10,
        scaleLabel: i18n.global.t('(0 = very dissatisfied, 10 = extremely satisfied)')
      },
      part4: {
        component: 'QuestionVisualAcuity',
        title: i18n.global.t('Visual Acuity Measurements'),
        measurements: SET1_PART4_MEASUREMENTS
      }
    }
  },

  // SET 2: PANOPTIX & ODYSSEY (5 parts)
  panoptix1: {
    type: 'panoptix1',
    productInfo: {
      name: i18n.global.t('PanOptix<sup>®</sup> and<br>Odyssey<sup>*</sup>'),
      subtitle: i18n.global.t('PanOptix<sup>®</sup><br>PanOptix<sup>®</sup> Toric')
    },
    totalParts: 5,
    parts: {
      part1: {
        component: 'QuestionRadio',
        title: i18n.global.t('Spectacle independence:'),
        questionText: i18n.global.t('On a typical day, how often do you wear glasses for the following tasks?'),
        tasks: SET2_PART1_TASKS,
        options: RADIO_OPTIONS
      },
      part2: {
        component: 'QuestionRadio',
        title: i18n.global.t('Visual Quality – Clarity of Vision'),
        questionText: i18n.global.t('Please rate the sharpness or clarity of your vision in bright light, dim light.'),
        tasks: SET2_PART2_TASKS,
        options: CLARITY_OPTIONS
      },
      part3: {
        component: 'QuestionRadio',
        title: i18n.global.t('Visual disturbances:'),
        questions: SET2_PART3_QUESTIONS
      },
      part4: {
        component: 'QuestionScale',
        title: i18n.global.t('Overall Vision Experience:'),
        questions: SET2_PART4_QUESTIONS,
        scaleMin: 0,
        scaleMax: 10,
        scaleLabel: i18n.global.t('(0 = very dissatisfied, 10 = extremely satisfied)')
      },
      part5: {
        component: 'QuestionVisualAcuity',
        title: i18n.global.t('Visual Acuity Measurements'),
        measurements: SET2_PART5_MEASUREMENTS
      }
    }
  },

  odyssey: {
    type: 'odyssey',
    productInfo: {
      name: i18n.global.t('PanOptix<sup>®</sup> and<br>Odyssey<sup>*</sup>'),
      subtitle: i18n.global.t('Odyssey<sup>*</sup><br> Odyssey<sup>*</sup> Toric')
    },
    totalParts: 5,
    parts: {
      part1: {
        component: 'QuestionRadio',
        title: i18n.global.t('Spectacle independence:'),
        questionText: i18n.global.t('On a typical day, how often do you wear glasses for the following tasks?'),
        tasks: SET2_PART1_TASKS,
        options: RADIO_OPTIONS
      },
      part2: {
        component: 'QuestionRadio',
        title: i18n.global.t('Visual Quality – Clarity of Vision'),
        questionText: i18n.global.t('Please rate the sharpness or clarity of your vision in bright light, dim light.'),
        tasks: SET2_PART2_TASKS,
        options: CLARITY_OPTIONS
      },
      part3: {
        component: 'QuestionRadio',
        title: i18n.global.t('Visual disturbances:'),
        questions: SET2_PART3_QUESTIONS
      },
      part4: {
        component: 'QuestionScale',
        title: i18n.global.t('Overall Vision Experience:'),
        questions: SET2_PART4_QUESTIONS,
        scaleMin: 0,
        scaleMax: 10,
        scaleLabel: i18n.global.t('(0 = very dissatisfied, 10 = extremely satisfied)')
      },
      part5: {
        component: 'QuestionVisualAcuity',
        title: i18n.global.t('Visual Acuity Measurements'),
        measurements: SET2_PART5_MEASUREMENTS
      }
    }
  },

  // SET 3: PANOPTIX & GALAXY (5 parts with variations)
  panoptix2: {
    type: 'panoptix2',
    productInfo: {
      name: i18n.global.t('PanOptix<sup>®</sup> and<br>Galaxy<sup>*</sup>'),
      subtitle: i18n.global.t('PanOptix<sup>®</sup><br> PanOptix<sup>®</sup> Toric')
    },
    totalParts: 5,
    parts: {
      part1: {
        component: 'QuestionRadio',
        title: i18n.global.t('Spectacle independence:'),
        questionText: i18n.global.t('On a typical day, how often do you wear glasses for the following tasks?'),
        tasks: SET2_PART1_TASKS,
        options: RADIO_OPTIONS
      },
      part2: {
        component: 'QuestionRadio',
        title: i18n.global.t('Visual Quality – Clarity of Vision'),
        questionText: i18n.global.t('Please rate the sharpness or clarity of your vision in bright light, dim light.'),
        tasks: SET3_PART2_TASKS,
        options: CLARITY_OPTIONS
      },
      part3: {
        component: 'QuestionRadio',
        title: i18n.global.t('Visual disturbances:'),
        questions: SET3_PART3_QUESTIONS
      },
      part4: {
        component: 'QuestionScale',
        title: i18n.global.t('Overall Vision Experience:'),
        questions: SET2_PART4_QUESTIONS,
        scaleMin: 0,
        scaleMax: 10,
        scaleLabel: i18n.global.t('(0 = very dissatisfied, 10 = extremely satisfied)')
      },
      part5: {
        component: 'QuestionVisualAcuity',
        title: i18n.global.t('Visual Acuity Measurements'),
        measurements: SET2_PART5_MEASUREMENTS
      }
    }
  },

  galaxy: {
    type: 'galaxy',
    productInfo: {
      name: i18n.global.t('PanOptix<sup>®</sup> and<br>Galaxy<sup>*</sup>'),
      subtitle: i18n.global.t('Galaxy<sup>*</sup><br> Galaxy<sup>*</sup> Toric')
    },
    totalParts: 5,
    parts: {
      part1: {
        component: 'QuestionRadio',
        title: i18n.global.t('Spectacle independence:'),
        questionText: i18n.global.t('On a typical day, how often do you wear glasses for the following tasks?'),
        tasks: SET2_PART1_TASKS,
        options: RADIO_OPTIONS
      },
      part2: {
        component: 'QuestionRadio',
        title: i18n.global.t('Visual Quality – Clarity of Vision'),
        questionText: i18n.global.t('Please rate the sharpness or clarity of your vision in bright light, dim light.'),
        tasks: SET3_PART2_TASKS,
        options: CLARITY_OPTIONS
      },
      part3: {
        component: 'QuestionRadio',
        title: i18n.global.t('Visual disturbances:'),
        questions: SET3_PART3_QUESTIONS
      },
      part4: {
        component: 'QuestionScale',
        title: i18n.global.t('Overall Vision Experience:'),
        questions: SET2_PART4_QUESTIONS,
        scaleMin: 0,
        scaleMax: 10,
        scaleLabel: i18n.global.t('(0 = very dissatisfied, 10 = extremely satisfied)')
      },
      part5: {
        component: 'QuestionVisualAcuity',
        title: i18n.global.t('Visual Acuity Measurements'),
        measurements: SET2_PART5_MEASUREMENTS
      }
    }
  }
};

/**
 * List of all valid questionnaire types
 */
export const QUESTIONNAIRE_TYPES = ['vivity', 'puresee', 'panoptix1', 'odyssey', 'panoptix2', 'galaxy'];
