```mermaid
erDiagram
	Session {
		String sid PK
		String expire
		String data
	}
	USERS {
		Int id PK  "autoincrement()"
		String loginId
		String pw
		String email
		DateTime createdAt  "now()"
		DateTime updatedAt  "now()"
	}

```
