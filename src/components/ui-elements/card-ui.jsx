import Card from '../ui/Card';
import Button from '../ui/buttons';
import Breadcrumb from '../ui/breadcrumbs';
import img1 from '../../assets/card-img/img-1.jpg';
import img2 from '../../assets/card-img/img-2.jpg';
import img3 from '../../assets/card-img/img-3.png';
import user1 from '../../assets/user/1.png';
import user2 from '../../assets/user/2.png';
import user3 from '../../assets/user/3.png';
import {
  FiMessageSquare,
  FiUsers,
  FiFolder,
  FiStar,
  FiArrowRight,
  FiCheck,
  FiX,
  FiMail,
  FiPhone,
  FiClock,
  FiHome,
} from 'react-icons/fi';

const CardUi = () => {
  return (
    <div className="pt-6 px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Card Components</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Flexible content containers with multiple variants and layouts</p>
        </div>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Components' },
            { label: 'UIElements' },
            { label: 'Card' },
          ]}
        />
      </div>

      {/* 01: Metric & Stat Cards (Top Overview Position) */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Metric & Stat Cards</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FiUsers className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Users</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">1,240 new</div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white ms-auto">12,438</div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FiFolder className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Projects</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Active</div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white ms-auto">86</div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FiStar className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Reviews</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">This week</div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white ms-auto">4.8</div>
            </div>
          </Card>
        </div>
      </div>

      {/* 02: Featured Horizontal Media Card */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Horizontal Media Card</h3>
        <Card padding={false} className="overflow-hidden" innerClassName="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 h-52 md:h-auto md:min-h-full shrink-0 relative overflow-hidden">
            <img src={img1} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">Beautiful Landscape</div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Crisp horizontal card suited for article previews and media items.</p>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700/40 my-4">
                {['Ravi', 'Neha', 'Karan', 'Meera'].map((n, i) => (
                  <li key={i} className="py-2.5 flex items-center gap-3">
                    <span className="h-8 w-8 rounded-full bg-slate-900 dark:bg-slate-800 flex items-center justify-center text-xs text-white font-bold">{n[0]}</span>
                    <div className="flex-1 text-gray-800 dark:text-gray-200 text-sm font-medium">{n}</div>
                    <Button color="primary" size="sm" variant="soft">View</Button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-2">
              <Button color="primary" rightIcon={<FiArrowRight />}>Read more</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* 03: Basic Image Content Cards */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Basic Image Content Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card padding={false} className="overflow-hidden">
            <div className="aspect-5/3">
              <img src={img1} alt="" className="object-cover w-full h-full" />
            </div>
            <div className="p-5">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Card Title</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 my-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <Button color="primary">Go to Page</Button>
            </div>
          </Card>
          <Card padding={false} className="overflow-hidden">
            <div className="p-5">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Card Title</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 my-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <Button color="primary">Go to Page</Button>
            </div>
            <div className="aspect-5/3">
              <img src={img2} alt="" className="object-cover w-full h-full" />
            </div>
          </Card>
          <Card padding={false} className="overflow-hidden">
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Card Title</h4>
            </div>
            <div className="aspect-5/3">
              <img src={img3} alt="" className="object-cover w-full h-full" />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <Button color="primary">Go to Page</Button>
            </div>
          </Card>
        </div>
      </div>

      {/* 04: Profile Cards */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Profile Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            [user1, 'Sarah Jenkins', 'Product Designer'],
            [user2, 'Alexander Morgan', 'Frontend Engineer'],
            [user3, 'David Miller', 'Project Manager'],
          ].map((p, i) => (
            <Card key={i} className="text-center">
              <img src={p[0]} alt="" className="h-20 w-20 rounded-full mx-auto object-cover" />
              <div className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">{p[1]}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{p[2]}</div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <Button size="sm" variant="solid" color="primary" leftIcon={<FiMail />}>Email</Button>
                <Button size="sm" variant="outline" color="primary" leftIcon={<FiPhone />}>Call</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 05: List & Activity Cards */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">List & Activity Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div className="font-semibold text-gray-900 dark:text-white">Team</div>
              <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">4</span>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700/40 mt-3">
              {['Ravi', 'Neha', 'Karan', 'Meera'].map((n, i) => (
                <li key={i} className="py-3 flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-slate-500/20 text-gray-900 dark:text-white flex items-center justify-center text-xs font-bold">{n[0]}</span>
                  <div className="flex-1 text-gray-800 dark:text-gray-200 text-sm">{n}</div>
                  <Button size="sm" variant="solid" color="primary">View</Button>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-gray-800">
              <div className="font-semibold text-gray-900 dark:text-white">Tasks</div>
              <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full">3</span>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700/40 mt-3">
              {[
                { title: 'Design review at 3PM', date: 'Today', color: 'bg-emerald-500' },
                { title: 'Update docs', date: 'Tomorrow', color: 'bg-indigo-500' },
                { title: 'Team retro', date: 'Fri', color: 'bg-amber-500' },
              ].map((t, i) => (
                <li key={i} className="py-3 flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${t.color}`}></span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{t.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t.date}</div>
                  </div>
                  <Button size="sm" variant="soft" color="primary">Open</Button>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      {/* 06: Pricing Cards */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Pricing Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            ['Starter', 'Free', 'For personal use', 'bg-primary'],
            ['Pro', '$12/mo', 'For growing teams', 'bg-indigo-500'],
            ['Enterprise', 'Custom', 'For large orgs', 'bg-rose-500'],
          ].map((t, i) => (
            <Card key={i} className="relative overflow-hidden pt-7">
              <div className={`absolute top-0 inset-x-0 h-1.5 ${t[3]}`} />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{t[0]}</div>
                <div className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">{t[1]}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t[2]}</div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><FiCheck className="text-emerald-500" /> Unlimited projects</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><FiCheck className="text-emerald-500" /> Team collaboration</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"><FiX className="text-rose-500" /> Dedicated support</div>
                </div>
                <div className="mt-5">
                  <Button block color={i === 1 ? 'primary' : 'secondary'} variant={i === 1 ? 'gradient' : 'solid'}>Choose Plan</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 07: Call To Action Cards */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Call To Action Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card padding="p-6">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">Get Started Today</div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kickstart your next project with our UI kit.</p>
            <div className="mt-4 flex gap-2">
              <Button leftIcon={<FiArrowRight />}>Start</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </Card>
          <Card padding="p-6">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">Upgrade to Pro</div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Unlock premium components and templates.</p>
            <div className="mt-4">
              <Button color="primary" variant="gradient" rightIcon={<FiArrowRight />}>Upgrade</Button>
            </div>
          </Card>
        </div>
      </div>

      {/* 08: Icon Header Cards */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Icon Header Cards</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            ['bg-primary text-white', 'Users', 'Manage team members'],
            ['bg-emerald-500/15 text-emerald-600 dark:text-emerald-300', 'Success', 'Completed tasks'],
            ['bg-amber-500/15 text-amber-600 dark:text-amber-300', 'Warnings', 'Pending reviews'],
            ['bg-rose-500/15 text-rose-600 dark:text-rose-300', 'Alerts', 'Security checks'],
          ].map((c, i) => (
            <Card key={i}>
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${c[0]}`}>
                <FiStar className={c[1].includes('Users') ? 'rotate-0' : 'rotate-12'} />
              </div>
              <div className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{c[1]}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{c[2]}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* 09: Quote Cards */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Quote Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            ['text-gray-900 dark:text-white'],
            ['bg-emerald-50 dark:bg-emerald-500/10', 'text-emerald-700 dark:text-emerald-200', 'border-emerald-200 dark:border-emerald-500/30'],
            ['bg-rose-50 dark:bg-rose-500/10', 'text-rose-700 dark:text-rose-200', 'border-rose-200 dark:border-rose-500/30']
          ].map((cls, idx) => (
            <Card key={idx} className={`${cls[0]} ${cls[1] || ''} ${cls[2] || ''}`}>
              <FiMessageSquare className={`text-2xl mb-3 ${cls[1] || ''}`} />
              <p className="italic text-sm">“Design is not just what it looks like and feels like. Design is how it works.”</p>
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">— Steve Jobs</div>
            </Card>
          ))}
        </div>
      </div>

      {/* 10: Overlay Image & Badge Cards */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Overlay & Badge Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[img1, img2, img3].map((im, i) => (
            <Card key={`ov-${i}`} padding={false} className="relative overflow-hidden">
              <img src={im} alt="" className="w-full h-44 object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-gray-900/70 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-xs opacity-90 flex items-center gap-1.5 mb-1"><FiClock /> 5 min read</div>
                <div className="text-base font-semibold">Exploring UI Patterns</div>
              </div>
            </Card>
          ))}
          {[
            ['New', 'bg-emerald-600'],
            ['Sale', 'bg-rose-600'],
            ['Featured', 'bg-indigo-600'],
          ].map((b, i) => (
            <Card key={`bd-${i}`} padding="p-5" className="relative">
              <span className={`absolute top-3 ltr:right-3 rtl:left-3 text-xs text-white px-2 py-0.5 rounded-full ${b[1]}`}>{b[0]}</span>
              <div className="text-base font-semibold text-gray-900 dark:text-white">Card with Badge</div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Use badges to highlight state and category.</p>
            </Card>
          ))}
        </div>
      </div>

      {/* 11: Card Border & Header Accents */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Card Border & Header Accents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { color: 'bg-primary', title: 'Primary Accent' },
            { color: 'bg-rose-500', title: 'Rose Accent' },
            { color: 'bg-emerald-500', title: 'Emerald Accent' }
          ].map((b, i) => (
            <Card key={`tb-${i}`} className="relative overflow-hidden pt-7">
              <div className={`absolute top-0 inset-x-0 h-1.5 ${b.color}`} />
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Top Border</div>
                <div className="text-base font-semibold text-gray-900 dark:text-white">{b.title}</div>
                <p className="text-xs mt-1.5 text-gray-500 dark:text-gray-400">Use a colored top border to signify category.</p>
              </div>
            </Card>
          ))}
          {[
            { bg: 'bg-primary dark:bg-primary', title: 'Primary Header' },
            { bg: 'bg-emerald-600 dark:bg-emerald-500', title: 'Success Header' },
            { bg: 'bg-rose-600 dark:bg-rose-500', title: 'Danger Header' }
          ].map((h, i) => (
            <Card key={`hb-${i}`} padding={false} className="overflow-hidden">
              <div className={`h-10 ${h.bg} flex items-center px-5 text-white font-medium text-sm`}>
                {h.title}
              </div>
              <div className="p-5">
                <div className="text-base font-semibold text-gray-900 dark:text-white">Colored Header</div>
                <p className="text-xs mt-1.5 text-gray-500 dark:text-gray-400">A small header strip brings strong visual hierarchy.</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 12: Glass & Gradient Outline Cards */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Glass & Gradient Outline Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="relative rounded-3xl overflow-hidden min-h-32">
            <div className="absolute inset-0 bg-linear-to-br from-primary via-indigo-500 to-purple-600" />
            <div className="relative z-10 m-0.5 h-full rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 p-5">
              <div className="text-base font-semibold text-white">Frosted Glass</div>
              <p className="text-xs text-white/80 mt-1">Use translucency + blur for a glassy look.</p>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden min-h-32">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-400 via-teal-500 to-cyan-600" />
            <div className="relative z-10 m-0.5 h-full rounded-3xl bg-linear-to-br from-white/25 to-white/10 backdrop-blur-md border border-white/30 p-5">
              <div className="text-base font-semibold text-white">Gradient Glass</div>
              <p className="text-xs text-white/80 mt-1">Blend translucency with gradients for depth.</p>
            </div>
          </div>
          {[
            { className: "border-2 border-primary", label: "Primary" },
            { className: "border-2 border-emerald-500", label: "Emerald" },
            { className: "border-2 border-rose-500", label: "Rose" },
          ].map(({ className, label }, i) => (
            <div key={`go-${i}`} className={`rounded-3xl p-0.5 ${className}`}>
              <div className="h-full w-full rounded-3xl p-5 bg-white dark:bg-gray-800/50 shadow-sm">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  Gradient Border · {label}
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  A 2px gradient wrapper simulates a coloured gradient border.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 13: Gradient Accent Cards */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Gradient Accent Cards</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {[
            'from-gray-500 via-gray-500 to-gray-700',
            'from-emerald-500 via-emerald-500 to-emerald-700',
            'from-rose-500 via-rose-500 to-rose-700',
            'from-amber-400 via-amber-500 to-amber-700',
            'from-cyan-500 via-cyan-500 to-cyan-700',
          ].map((grad, i) => (
            <Card key={`col-${i}`} className={`bg-linear-to-br ${grad}`}>
              <div className="text-xs opacity-90 text-white font-medium">Category</div>
              <div className="text-base font-semibold mt-1 text-white">Gradient Card</div>
              <div className="mt-2 text-xs text-white/90">Beautiful gradient surfaces for emphasis.</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardUi;
