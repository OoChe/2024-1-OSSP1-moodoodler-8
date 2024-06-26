import { useNavigate } from 'react-router-dom';
import { defaultAxios } from '../axios/defaultAxios';

export default function useSurvey() {
  const navigate = useNavigate();
  const postPositiveSurveyAnswers = async (positives) => {
    try {
      const postPositiveSurveyAnswersResponse = await defaultAxios.post(`/user/survey/positive/`, {
        id: localStorage.getItem('id'),
        question: 'positive',
        answer: positives,
      });
    } catch (error) {
      console.error('Error submitting answers:', error.response);
    }
  };

  const postNegativeSurveyAnswers = async (negatives) => {
    try {
      const postNegativeSurveyAnswersResponse = await defaultAxios.post(`/user/survey/negative/`, {
        id: localStorage.getItem('id'),
        question: 'negative',
        answer: negatives,
      });
      navigate('/welcome');
    } catch (error) {
      console.error('Error submitting answers:', error.response);
    }
  };

  return { postPositiveSurveyAnswers, postNegativeSurveyAnswers };
}
