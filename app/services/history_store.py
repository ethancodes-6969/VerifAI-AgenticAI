from collections import defaultdict
import asyncio

class UserTransactionHistory:
    def __init__(self):
        self._history = defaultdict(list)
        self._lock = asyncio.Lock()

    async def add_transaction(self, user_id: str, transaction: dict):
        async with self._lock:
            self._history[user_id].append(transaction)

    async def get_user_history(self, user_id: str):
        async with self._lock:
            return self._history.get(user_id, [])
