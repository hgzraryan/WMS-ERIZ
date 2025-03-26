import requests
import threading

# Define the target URL of your Node.js authentication system
target_url = "https://inecoecom.am/orderstatus/getOrderStatus/630b5bdf-de59-4ff2-9cf0-5"

# Define the Bearer token you want to use
bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJ1c2VybmFtZSI6IndicHJvZCIsInJvbGVzIjpbMjAwMSwxOTg0LDUxNTBdLCJpc0FjdGl2ZSI6MX0sImlhdCI6MTY5ODIzNzAyNCwiZXhwIjoxNjk4MjM3NjI0fQ.qVxbBuhHK53Y9ZnbRo2rrcde7zXXgRa_6mVrQqIgKZ4"

# Define the number of concurrent users and the number of requests per user
concurrent_users = 100
requests_per_user = 200


# Function to send HTTP requests with the Bearer token
def send_requests(user_id):
    headers = {"Authorization": f"Bearer {bearer_token}"}

    for _ in range(requests_per_user):
        try:
            response = requests.get(target_url, headers=headers, data={})
            if response.status_code == 200:
                print(f"Status {user_id}: Request successful")
            else:
                print(f"Status {user_id}: Request failed with status code {response.status_code}")
        except Exception as e:
            print(f"Status {user_id}: Request failed with exception: {str(e)}")


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