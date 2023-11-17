import requests
import threading

# Define the target URL of your Node.js authentication system
target_url = "https://127.0.0.1/auth"

# Define the number of concurrent users and the number of requests per user
concurrent_users = 100
requests_per_user = 20

# Function to send HTTP requests
def send_requests(user_id):
    for _ in range(requests_per_user):
        try:
            response = requests.post(target_url, data={"user": "test", "pwd": "test"})
            if response.status_code == 200:
                print(f"User {user_id}: Request successful")
            else:
                print(f"User {user_id}: Request failed with status code {response.status_code}")
        except Exception as e:
            print(f"User {user_id}: Request failed with exception: {str(e)}")

# Create and start threads for concurrent users
threads = []
for user_id in range(1, concurrent_users + 1):
    thread = threading.Thread(target=send_requests, args=(user_id,))
    threads.append(thread)
    thread.start()

# Wait for all threads to complete
for thread in threads:
    thread.join()

print("Load test complete")
