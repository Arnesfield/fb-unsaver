# fb-unsaver

Facebook collection unsaver script.

> [!CAUTION]
>
> **THIS WILL UNSAVE ALL VISIBLE ITEMS ONE BY ONE. USE WITH CAUTION.**

## Usage

1. Go to your Facebook collection page (<https://www.facebook.com/saved>).

2. Open the browser developer console for that page.

3. Paste and enter the contents of [`src/index.js`](src/index.js) into the browser developer console.

4. Make sure the page/tab is always open and active so that the next saved items are always loaded. It is recommended to refrain from any page interaction (clicking, keyboard inputs, etc.) while the `fb-unsaver` script is running.

5. If `fb-unsaver` stops and shows an alert while there are still saved items to remove, refer to **step #3** to start it again (or enter `unsave()` in the console).

6. To stop `fb-unsaver`, close the page.

## References

- <https://github.com/bouiboui/facebook-saved/issues/6#issuecomment-1129511366>

## License

Licensed under the [MIT License](LICENSE).
