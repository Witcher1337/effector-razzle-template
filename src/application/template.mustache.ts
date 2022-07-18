export const mustacheTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    {{& title}}
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <link rel="stylesheet" href="{{& assets.css}}" />
    <script src="{{& assets.js}}" defer></script>
  </head>
  <body>
    <div id="root">{{& markup}}</div>
    <script>
      INITIAL_STATE = {{& initialState}};
    </script>
  </body>
</html>
`;
