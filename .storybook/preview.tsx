import type { Preview } from '@storybook/nextjs-vite'
import '../app/globals.css';

// import { GlobalStyle } from '../app/styles/GlobalStyle';
// import { fontClasses } from '../app/assets/fonts/fonts';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    // decorators: [
    //   (Story: any) => (
    //     /* Inject the Next.js font class variables into the container wrapper */
    //     <div className={fontClasses}>
    //       <GlobalStyle />
    //       <Story />
    //     </div>
    //   ),
    // ],
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
