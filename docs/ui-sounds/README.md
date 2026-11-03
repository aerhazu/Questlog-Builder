# UI sound placeholders

These `.wav` files are temporary replaceable placeholders for the optional UI sound system.

The editor tries to load these files first, then falls back to small browser-local Web Audio tones if a file cannot be decoded. Later, these files can be replaced with final button, menu, typing, success, and error sounds without changing the grouped Settings controls.

Current placeholder set:

- `ui-click.wav` - normal button/action click.
- `ui-toggle.wav` - checkboxes, selects, sliders, and theme/mute style toggles.
- `ui-type.wav` - quiet typing tick.
- `ui-backtype.wav` - quiet Backspace/Delete typing variation.
- `ui-success.wav` - successful save/import/export/toast feedback.
- `ui-error.wav` - warning/error toast feedback.
- `ui-menu.wav` - menus and panel actions.

Grouped Settings wiring:

- Core actions: `click`, `toggle`, and `menu` routes use the main UI sounds toggle.
- Typing: `type` and `backtype` routes use the Typing sounds toggle.
- Feedback: `success` and `error` routes use the Feedback sounds toggle.

The Settings > Preferences Feedback checks card lists these filenames directly, and `?soundDiscoverabilitySelfTest=1` verifies that the route map, visible card rows, asset loading, and unique placeholder files still line up.
