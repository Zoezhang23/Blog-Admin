import defaultSettings from '../settings.json';

const defaultTheme = localStorage.getItem('arco-theme') || 'light';

function changeTheme(newTheme?: 'string') {
  if ((newTheme || defaultTheme) === 'dark') {
    document.body.setAttribute('arco-theme', 'dark');
  } else {
    document.body.removeAttribute('arco-theme');
  }
}

// init page theme
changeTheme();

export interface GlobalState {
  theme?: string;
  settings?: typeof defaultSettings;
  userInfo?: {
    name?: string;
    avatar?: string;
    job?: string;
    organization?: string;
    location?: string;
    email?: string;
  };
}

const initialState: GlobalState = {
  theme: defaultTheme,
  settings: defaultSettings,
  userInfo: {
    name: localStorage.getItem('userName') || 'Zoë',
    avatar: 'http://zhijuan-blog.herokuapp.com/static/media/me.cc8b5a93.jpg',
    job: 'Frontend Developer',
    organization: '',
    location: 'Eindhoven, NL',
    email: 'zhangzhijuan23@gmail.com',
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    //login redux
    case 'LOGIN': {
      const { userName } = action.payload;
      localStorage.setItem('userName', userName);
      console.log(state);
      return {
        ...state,
        userInfo: { ...state.userInfo, name: userName }
      }
    }
    case 'toggle-theme': {
      const { theme } = action.payload;
      if (theme === 'light' || theme === 'dark') {
        localStorage.setItem('arco-theme', theme);
        changeTheme(theme);
      }

      return {
        ...state,
        theme,
      };
    }
    case 'update-settings': {
      const { settings } = action.payload;
      return {
        ...state,
        settings,
      };
    }
    default:
      return state;
  }
}
