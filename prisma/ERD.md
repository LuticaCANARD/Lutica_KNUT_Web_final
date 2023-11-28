```mermaid
erDiagram
	Session {
		String sid PK
		String expire
		String data
	}
	user {
		String id PK  "uuid()"
		String loginId
		String password
		String email
		DateTime createdAt  "now()"
		Int passwordErrorCount
		String mainDesc
		String mainProfilePicture  "nullable"
		String mainTitlePicture  "nullable"
	}
	Post {
		Int id PK  "autoincrement()"
		String userId FK
		String file  "nullable"
		String desc  "nullable"
		String location  "nullable"
		DateTime createdAt  "now()"
	}
	Picture {
		Int id PK  "autoincrement()"
		String userId FK
		DateTime createdAt  "now()"
		String name
		String path
	}
	PostPicture {
		String id PK  "uuid()"
		Int postId FK  "nullable"
		Int pictureId FK  "nullable"
	}
	UserSchedule {
		Int id PK  "autoincrement()"
		String userId FK
		String file  "nullable"
		String desc  "nullable"
		String location  "nullable"
		DateTime date
	}
	Social {
		String followerId
		String targetId
	}
	Post }o--|| user : user
	Picture }o--|| user : user
	PostPicture }o--|| Post : post
	PostPicture }o--|| Picture : picture
	UserSchedule }o--|| user : user

```
