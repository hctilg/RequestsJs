# RequestsJs

Send HTTP requests easily using JavaScript

## import RequestsJs using this script link

```html
<script src="https://hctilg.github.io/RequestsJs/requests.min.js" async></script>
```

<br>

## Example

```javascript
var options = {
  method: 'POST',
  header: {
    "Accept": "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  params: {
    "username": "username",
    "password": "********"
  },
};

const success = data => {
  console.log("Status: " + data.status);
  console.log("Response: " + data.response);
}

const error = error => console.error(error);

$request('/app/login', options)
  .then(success)
  .catch(error);
```

### [Demo & Test](https://hctilg.github.io/RequestsJs)
