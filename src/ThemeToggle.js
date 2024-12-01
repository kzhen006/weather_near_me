
import React from 'react';
import { useTheme } from './ThemeContext';

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                />
                <span className="slider round"></span>
            </label>
        </div>
    );
}

export default ThemeToggle;
