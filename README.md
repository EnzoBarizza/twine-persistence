# Twine Persistence
## Lib for persist data during gameplay in Twine

> The only supported fields by now is: *input* and *textarea*

### Instalation
Copy the content of file [libPersistence.js](persistenceLib.js) and paste inside `Story > JavaScript` in Twine

### Usage

Create a new passage in Twine and create a field with HTML, and then put the attribute `use-persistence`
```html
<input use-persistence="dataId">
```
For different fields, don't repeat the value of the attribute; it will determine where Twine Persistence will allocate the value.

Now every field with the same `use-persistence` value will be syncronized with the same value