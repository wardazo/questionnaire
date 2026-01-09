// Tab section configurations for each comparison set
import i18n from '@/i18n';

export const RESULTS_TAB_SECTIONS = {
  'vivity-puresee': [
    {
      id: 0,
      label: i18n.global.t('Spectacle independence & clarity'),
      title: i18n.global.t('Spectacle independence:'),
      subtitle: i18n.global.t('On a typical day, how often do you wear glasses for the following tasks?'),
      questionIds: ['SET1_SPECTACLE_FAR', 'SET1_SPECTACLE_ARMS', 'SET1_SPECTACLE_NEAR'],
      taskLabels: [i18n.global.t('Far away'), i18n.global.t("Arm's length"), i18n.global.t('Up close')],
      chartType: 'bar',
      optionType: 'RADIO_OPTIONS'
    },
    {
      id: 1,
      label: i18n.global.t('Visual disturbances - Halos'),
      title: i18n.global.t('Visual disturbances - Halos'),
      subtitle: '',
      chartType: 'pie',
      questions: [
        { questionId: 'SET1_HALOS_FREQ', title: i18n.global.t('Do you experience halos in dim light?') },
        { questionId: 'SET1_HALOS_BOTHER', title: i18n.global.t('How bothersome are these with activities like night driving?') }
      ]
    },
    {
      id: 2,
      label: i18n.global.t('Visual disturbances - Glare'),
      title: i18n.global.t('Visual disturbances - Glare'),
      subtitle: '',
      chartType: 'pie',
      questions: [
        { questionId: 'SET1_GLARE_FREQ', title: i18n.global.t('Do you experience glare?') },
        { questionId: 'SET1_GLARE_BOTHER', title: i18n.global.t('How bothersome are these with activities like night driving?') }
      ]
    },
    {
      id: 3,
      label: i18n.global.t('Visual acuity & patient satisfaction'),
      title: i18n.global.t('Visual Acuity & Patient Satisfaction'),
      subtitle: '',
      chartType: 'combined',
      acuityQuestionIds: ['SET1_ACUITY_UNVA40', 'SET1_ACUITY_UIVA66', 'SET1_ACUITY_UDVA'],
      acuityMeasurementLabels: [
        { name: i18n.global.t('UNVA'), distance: '' },
        { name: i18n.global.t('UIVA'), distance: '' },
        { name: i18n.global.t('UDVA'), distance: '' }
      ],
      satisfactionQuestionId: 'SET1_SATISFACTION'
    }
  ],

  'panoptix-odyssey': [
    {
      id: 0,
      label: i18n.global.t('Spectacle independence'),
      title: i18n.global.t('Spectacle independence:'),
      subtitle: i18n.global.t('On a typical day, how often do you wear glasses for the following tasks?'),
      chartType: 'bar',
      questionIds: ['SET2_SPECTACLE_FAR', 'SET2_SPECTACLE_INTERMEDIATE', 'SET2_SPECTACLE_NEAR', 'SET2_SPECTACLE_VERYNEAR'],
      taskLabels: [i18n.global.t('Far'), i18n.global.t('Intermediate'), i18n.global.t('Near'), i18n.global.t('Very Near')],
      optionType: 'RADIO_OPTIONS'
    },
    {
      id: 1,
      label: i18n.global.t('Clarity of Vision'),
      title: i18n.global.t('Clarity of Vision'),
      subtitle: i18n.global.t('Please rate the sharpness or clarity of your vision'),
      chartType: 'bar',
      questionIds: ['SET2_CLARITY_BRIGHT', 'SET2_CLARITY_DIM'],
      taskLabels: [i18n.global.t('Bright light'), i18n.global.t('Dim light')],
      optionType: 'CLARITY_OPTIONS'
    },
    {
      id: 2,
      label: i18n.global.t('Visual disturbances - Halos'),
      title: i18n.global.t('Visual disturbances - Halos'),
      subtitle: '',
      chartType: 'pie',
      questions: [
        { questionId: 'SET2_HALOS_FREQ', title: i18n.global.t('Do you experience halos in dim light?') },
        { questionId: 'SET2_HALOS_BOTHER', title: i18n.global.t('How bothersome are these with activities like night driving?') }
      ]
    },
    {
      id: 3,
      label: i18n.global.t('Visual disturbances - Glare'),
      title: i18n.global.t('Visual disturbances - Glare'),
      subtitle: '',
      chartType: 'pie',
      questions: [
        { questionId: 'SET2_GLARE_FREQ', title: i18n.global.t('Do you experience glare?') },
        { questionId: 'SET2_GLARE_BOTHER', title: i18n.global.t('How bothersome are these with activities like night driving?') }
      ]
    },
    {
      id: 4,
      label: i18n.global.t('Visual disturbances - Starburst'),
      title: i18n.global.t('Visual disturbances - Starburst'),
      subtitle: '',
      chartType: 'pie',
      questions: [
        { questionId: 'SET2_STARBURSTS_FREQ', title: i18n.global.t('Do you experience halos in dim light?') },
        { questionId: 'SET2_STARBURSTS_BOTHER', title: i18n.global.t('Do you experience glare?') }
      ]
    },
    {
      id: 5,
      label: i18n.global.t('Visual acuity & patient satisfaction'),
      title: i18n.global.t('Visual Acuity & Patient Satisfaction'),
      subtitle: '',
      chartType: 'combined',
      acuityQuestionIds: ['SET2_ACUITY_UNVA33', 'SET2_ACUITY_UIVA66', 'SET2_ACUITY_UDVA_NEAR', 'SET2_ACUITY_UDVA'],
      acuityMeasurementLabels: [
        { name: i18n.global.t('UNVA'), distance: '33 cm' },
        { name: i18n.global.t('UIVA'), distance: '66 cm' },
        { name: i18n.global.t('UNIA'), distance: '66 cm' },
        { name: i18n.global.t('UDVA'), distance: '' }
      ],
      satisfactionQuestionId: 'SET2_SATISFACTION'
    }
  ],

  'panoptix-galaxy': [
    {
      id: 0,
      label: i18n.global.t('Spectacle independence'),
      title: i18n.global.t('Spectacle independence:'),
      subtitle: i18n.global.t('On a typical day, how often do you wear glasses for the following tasks?'),
      chartType: 'bar',
      questionIds: ['SET2_SPECTACLE_FAR', 'SET2_SPECTACLE_INTERMEDIATE', 'SET2_SPECTACLE_NEAR', 'SET2_SPECTACLE_VERYNEAR'],
      taskLabels: [i18n.global.t('Far'), i18n.global.t('Intermediate'), i18n.global.t('Near'), i18n.global.t('Very Near')],
      optionType: 'RADIO_OPTIONS'
    },
    {
      id: 1,
      label: i18n.global.t('Clarity of Vision'),
      title: i18n.global.t('Visual Quality'),
      subtitle: i18n.global.t('Rate the sharpness or clarity of your vision in bright and dim light conditions'),
      chartType: 'bar',
      questionIds: ['SET3_CLARITY_BRIGHT', 'SET3_CLARITY_DIM', 'SET3_CLARITY_LOWCONTRAST'],
      taskLabels: [i18n.global.t('Bright light'), i18n.global.t('Dim light'), i18n.global.t('Low contrast')],
      optionType: 'CLARITY_OPTIONS'
    },
    {
      id: 2,
      label: i18n.global.t('Visual disturbances - Ghosting'),
      title: i18n.global.t('Visual disturbances - Ghosting'),
      subtitle: '',
      chartType: 'pie',
      questions: [
        { questionId: 'SET3_SHADOW_GHOST', title: i18n.global.t("Do you ever notice a 'shadow,' 'ghost,' or faint double image around objects even in good lighting?") },
        { questionId: 'SET3_GLARE_WHEN', title: i18n.global.t('When do you notice it the most?') }
      ]
    },
    {
      id: 3,
      label: i18n.global.t('Visual acuity & patient satisfaction'),
      title: i18n.global.t('Visual Acuity & Patient Satisfaction'),
      subtitle: '',
      chartType: 'combined',
      acuityQuestionIds: ['SET2_ACUITY_UNVA33', 'SET2_ACUITY_UIVA66', 'SET2_ACUITY_UDVA_NEAR', 'SET2_ACUITY_UDVA'],
      acuityMeasurementLabels: [
        { name: i18n.global.t('UNVA'), distance: '33 cm' },
        { name: i18n.global.t('UIVA'), distance: '66 cm' },
        { name: i18n.global.t('UNIA'), distance: '66 cm' },
        { name: i18n.global.t('UDVA'), distance: '' }
      ],
      satisfactionQuestionId: 'SET2_SATISFACTION'
    }
  ]
};

// Chart color mapping for different answer types
export const CHART_COLORS = {
  // RADIO_OPTIONS (Never/Occasionally/Often/Always)
  never: '#02AF4B',          // Green
  occasionally: '#00AEEF',   // Beige
  often: '#F0C846',          // Orange
  always: '#D62E22',         // Red

  // BOTHERSOME_OPTIONS
  not_at_all: '#02AF4B',     // Green (best)
  a_little: '#00AEEF',       // Beige
  moderately: '#F0C846',     // Orange
  significantly: '#D62E22',  // Red (worst)

  // CLARITY_OPTIONS
  very_clear: '#02AF4B',     // Green (best)
  somewhat_clear: '#00AEEF', // Beige
  slightly_blurry: '#F0C846',// Orange
  very_blurry: '#D62E22',    // Blue (worst)

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
  reading: '#03AEEE',          // Blue
  evening: '#ffac1c',
  watching_tv: '#D2B48C',
  low_light: '#FF8A65',
  no_specific_time: '#4CAF50'
};
