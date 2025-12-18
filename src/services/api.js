import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:8000';
const API_KEY = process.env.VUE_APP_API_KEY || '';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY
  },
  timeout: 10000
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      //console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      //console.log(`API Response: ${response.status}`);
    }
    return response;
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      //console.error('API Error:', error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Get counts of completed questionnaires grouped by type for a specific account
 * @param {string} accountId - Salesforce account ID
 * @returns {Promise<Object>} - { vivity: 5, puresee: 3, ... }
 */
export async function getQuestionnaireCounts(accountId) {
  // Validate account ID
  if (!accountId || typeof accountId !== 'string') {
    //console.error('Invalid account ID provided to getQuestionnaireCounts:', accountId);
    throw new Error('Account ID is required');
  }

  try {
    const response = await apiClient.get('/api/questionnaires/counts', {
      params: { account_id: accountId }
    });
    return response.data;
  } catch (error) {
    //console.error('Failed to fetch questionnaire counts:', error);
    // Return empty counts on error
    return {
      vivity: 0,
      puresee: 0,
      panoptix1: 0,
      odyssey: 0,
      panoptix2: 0,
      galaxy: 0
    };
  }
}

/**
 * Submit a completed questionnaire
 * @param {Object} payload - { questionnaireType, salesforceAccountId, startedAt, completedAt, randomNumber, answers: [{questionId, value}] }
 * @returns {Promise<Object>}
 */
export async function submitQuestionnaire(payload) {
  // Validate payload has account ID
  if (!payload.salesforceAccountId) {
    //console.error('Payload missing salesforceAccountId:', payload);
    throw {
      type: 'validation_error',
      message: 'Salesforce account ID is required for submission'
    };
  }

  try {
    const response = await apiClient.post('/api/questionnaires/submit', payload);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw {
        type: 'api_error',
        status: error.response.status,
        message: error.response.data?.detail || 'Server error',
        originalError: error
      };
    } else if (error.request) {
      throw {
        type: 'network_error',
        message: 'Network error. Please check your connection and try again.',
        originalError: error
      };
    } else {
      throw {
        type: 'unknown_error',
        message: error.message || 'An unexpected error occurred',
        originalError: error
      };
    }
  }
}

/**
 * Get aggregated results for a comparison set, filtered by account ID
 * @param {string} comparisonSet - 'vivity-puresee' | 'panoptix-odyssey' | 'panoptix-galaxy'
 * @param {string} accountId - Salesforce account ID
 * @returns {Promise<Object>} Aggregated results data
 */
export async function getResultsData(comparisonSet, accountId) {
  // Validate account ID
  if (!accountId || typeof accountId !== 'string') {
    //console.error('Invalid account ID provided to getResultsData:', accountId);
    throw {
      type: 'validation_error',
      message: 'Account ID is required'
    };
  }

  try {
    const response = await apiClient.get(`/api/questionnaires/results/${comparisonSet}`, {
      params: { account_id: accountId }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw {
        type: 'api_error',
        status: error.response.status,
        message: error.response.data?.detail || 'Failed to fetch results',
        originalError: error
      };
    } else if (error.request) {
      throw {
        type: 'network_error',
        message: 'Network error. Please check your connection.',
        originalError: error
      };
    } else {
      throw {
        type: 'unknown_error',
        message: error.message || 'Unexpected error occurred',
        originalError: error
      };
    }
  }
}

export default apiClient;
