# Cursor.js
Simple JS library which replaces _cursor: url()_ property with new image.

## How to install
1. add this code before &lt;/body&gt; tag:
```html
<script src="path_to_your_Cursor.js"></script>
<script>
  CursorJS.enable('path_to_your_cursor.png');
  CursorJS.addEl(document.querySelector('your_element_css_selector'));
</script>
```
That's all! Now enjoy the magic! :)

## Customization
In Cursor.js, there is a 'mouseOffset' variable, which means how much off the cursor will be, try it yourself :)
