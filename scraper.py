import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

URL = "https://www.buddy4study.com/scholarships"
headers = {"User-Agent": "Mozilla/5.0"}

def get_scholarships():
    response = requests.get(URL, headers=headers)
    soup = BeautifulSoup(response.content, "html.parser")
    cards = soup.select(".sc-1nw6gk1-1.bXLhTF")  # Selector based on Buddy4Study's layout

    scholarships = []
    for card in cards[:50]:  # Limit to 50 scholarships
        try:
            title = card.select_one("h3").get_text(strip=True)
            deadline = card.select_one(".sc-1nw6gk1-6").get_text(strip=True)  # Deadline
            amount = card.select_one(".sc-1nw6gk1-8").get_text(strip=True) if card.select_one(".sc-1nw6gk1-8") else "N/A"
            eligibility = card.select_one(".sc-1nw6gk1-9").get_text(strip=True) if card.select_one(".sc-1nw6gk1-9") else "Eligibility info not available"
            link = "https://www.buddy4study.com" + card.find("a")["href"]

            scholarships.append({
                "name": title,
                "amount": amount,
                "deadline": deadline,
                "eligibility": eligibility,
                "link": link
            })
        except Exception as e:
            print("Error parsing card:", e)

    return scholarships

if __name__ == "__main__":
    data = get_scholarships()
    with open("scholarships.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(data)} scholarships.")
