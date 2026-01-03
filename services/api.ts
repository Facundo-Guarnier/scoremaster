
/**
 * Utility to call Netlify functions.
 * Netlify functions are served from /.netlify/functions/ during development and production.
 */
export const callHelloFunction = async () => {
  try {
    const response = await fetch('/.netlify/functions/hello');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error calling Netlify function:', error);
    return { message: 'Failed to connect to backend' };
  }
};
