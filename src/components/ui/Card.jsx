import { cx } from '../layout/Uihelpers';

export const Card = ({
    children,
    variant = 'default',
    hover = false,
    padding = true,
    innerClassName = '',
    className = '',
    ...props
}) => {
    const variants = {
        default: 'bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-xl dark:shadow-black/40 backdrop-blur-xl',
        glass: 'bg-white/80 dark:bg-white/10 border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-2xl backdrop-blur-2xl',
        gradient: 'bg-gradient-to-br from-purple-500/5 via-violet-500/5 to-transparent dark:from-purple-500/10 dark:via-violet-500/5 dark:to-transparent border border-purple-500/20 shadow-md backdrop-blur-xl',
        solid: 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-sm',
        outline: 'bg-transparent border border-slate-200 dark:border-white/10',
    };

    return (
        <div
            className={cx(
                'rounded-3xl transition-all duration-300 dark:text-white',
                'focus-within:relative focus-within:z-20 has-[[data-headlessui-state*=open]]:relative has-[[data-headlessui-state*=open]]:z-30 has-[[data-headlessui-state*=open]]:overflow-visible',
                padding ? (typeof padding === 'string' ? padding : 'p-6') : '',
                variants[variant] || variants.default,
                hover && 'hover:border-purple-500/40 hover:shadow-md dark:hover:shadow-lg dark:hover:border-purple-500/30 transition-all duration-200',
                className
            )}
            {...props}
        >
            {innerClassName ? (
                <div className={innerClassName}>
                    {children}
                </div>
            ) : (
                children
            )}
        </div>
    );
};

export default Card;
