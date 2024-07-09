const api_url = "http://localhost:3300/api/quotes/";

async function getapi(url) {
    try {
        console.log('Starting fetch operation'); // Debug statement
        const response = await fetch(url);
        console.log('Fetch response received'); // Debug statement
        
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Data received:', data); // Debug statement
        
        if (data.length > 0) {
            document.getElementById('quote').textContent = data[0].q;
            document.getElementById('author').textContent = data[0].a;
        } else {
            throw new Error('No quotes found');
        }
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
        document.getElementById('quote').textContent = 'Failed to fetch quote. Please try again later.';
        document.getElementById('author').textContent = '';
    }
}

// Call the function when the window loads
window.onload = () => getapi(api_url);
