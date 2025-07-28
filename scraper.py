import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

SCHOLARSHIPS_FILE = 'scholarships.json'

def scrape_scholarships():
    scholarships = []

    # Example: Scraping scholarships.gov.in
    url = 'https://scholarships.gov.in/'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Parse data (this depends on actual website structure)
    # For demonstration, adding dummy data
    for i in range(50):
        scholarships.append({
            "name": f"Sample Scholarship {i+1}",
            "description": "Description of scholarship.",
            "deadline": (datetime.now().replace(year=datetime.now().year + 1)).strftime('%Y-%m-%d'),
            "category": "Need-based" if i % 2 == 0 else "Merit-based",
            "education_level": "Undergraduate" if i % 3 == 0 else "Postgraduate",
            "apply_link": "https://example.com/apply"
        })

    # Save to JSON
    with open(SCHOLARSHIPS_FILE, 'w') as f:
        json.dump(scholarships, f, indent=2)

if __name__ == "__main__":
    scrape_scholarships()
