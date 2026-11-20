import {
  FiHeart,
  FiActivity,
  FiShield,
  FiClock,
  FiCalendar,
  FiFileText,
  FiAlertCircle,
  FiCheckCircle,
  FiImage,
  FiHome,
} from 'react-icons/fi';
import img1 from '../../assets/card-img/img-1.jpg';
import img2 from '../../assets/card-img/img-2.jpg';
import img3 from '../../assets/card-img/img-3.png';
import Card from "../ui/Card";
import Accordion from "../ui/accordion";
import Badges from "../ui/badges";
import Breadcrumb from "../ui/breadcrumbs";

const badge = (text, color) => (
  <Badges size='sm' color={color} variant='soft' rounded='pill'>{text}</Badges>
);

const SectionHeader = ({ number, title, description }) => (
  <div className="flex items-start gap-3.5 mb-4">
    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm shrink-0 mt-0.5 border border-primary/20">
      {number}
    </div>
    <div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{title}</h2>
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
    </div>
  </div>
);

const AccordionUi = () => {
  // Department color palettes for hospital units
  const DEPARTMENT_PALETTES = [
    { name: 'Primary', title: 'General Medicine & Primary Care', desc: 'Routine examinations, diagnostic screening, and preventive health wellness programs.' },
    { name: 'Indigo', title: 'Pediatric & Neonatal Ward', desc: 'Specialized infant incubators, pediatric diagnostics, and childhood wellness clinics.' },
    { name: 'Emerald', title: 'Pathology & Clinical Lab', desc: 'Automated hematology, biochemistry analysis, culture panels, and micro-biology testing.' },
    { name: 'Rose', title: 'Oncology & Infusion Center', desc: 'Targeted chemo infusion therapy, radiation oncology support, and palliative care.' },
    { name: 'Amber', title: 'Orthopedics & Physical Rehab', desc: 'Joint replacement rehabilitation, physical therapy, and arthroscopic diagnostics.' },
    { name: 'Cyan', title: 'Pulmonology & Respiratory Care', desc: 'Pulmonary function diagnostics, ventilator support, and sleep disorder therapies.' },
    { name: 'Slate', title: 'Hospital Administration & EHR', desc: 'Medical billing, insurance claim processing, and health information management.' },
    { name: 'Purple', title: 'Neurology & Neurosurgery Wing', desc: 'EEG telemetry monitoring, acute stroke response units, and neuro-critical care.' },
    { name: 'Pink', title: 'Maternity & Women\'s Health', desc: 'Private birthing suites, prenatal 4D ultrasound, and maternal-fetal medicine.' },
    { name: 'Teal', title: 'Cardiovascular Care Center', desc: 'Cardiac telemetry monitoring, pacemaker clinic, and vascular intervention care.' },
  ];

  const ACCENT_UNITS = [
    { name: 'Primary', title: 'Emergency Triage Protocol', desc: 'Standard fast-track protocol for ambulatory emergency arrivals and urgent vitals assessment.' },
    { name: 'Indigo', title: 'ICU Patient Telemetry Monitoring', desc: 'Continuous real-time hemodynamics, SpO2 levels, and automated cardiac arrhythmia alarms.' },
    { name: 'Emerald', title: 'In-House Blood Bank & Transfusions', desc: 'Cross-matching, emergency platelet reserves, and secure whole blood distribution network.' },
    { name: 'Rose', title: 'Critical Infection Precautions', desc: 'Contact, droplet, and airborne pathogen containment with negative pressure airflow.' },
    { name: 'Amber', title: 'Post-Anesthesia Care Unit (PACU)', desc: 'Phase-1 and Phase-2 recovery observation following general and regional surgical anesthesia.' },
    { name: 'Cyan', title: 'Diagnostic Imaging Schedules', desc: 'Priority scheduling for contrast CT imaging, MRI studies, and bedside digital radiography.' },
  ];

  const GRADIENT_SERVICES = [
    { name: 'Primary', title: '24/7 Mobile Intensive Care Ambulance', desc: 'GPS-tracked emergency paramedic fleet equipped with advanced cardiac life support systems.' },
    { name: 'Indigo', title: 'Advanced Robotic Surgical Suite', desc: 'Minimally invasive robotic surgical arms with high-definition 3D stereoscopic visualization.' },
    { name: 'Emerald', title: 'Clinical Trials & Therapeutic Research', desc: 'Groundbreaking multi-center investigational drug trials and personalized genomics research.' },
    { name: 'Rose', title: 'Rapid Trauma Resuscitation Bays', desc: 'Dedicated trauma bays equipped for immediate multi-disciplinary intervention in the golden hour.' },
    { name: 'Amber', title: 'Organ Transplant & Donor Coordination', desc: 'Comprehensive surgical coordination for kidney, liver, and corneal transplant procedures.' },
    { name: 'Cyan', title: 'Telemedicine & Remote Clinical Consults', desc: 'Encrypted video consultations for post-discharge patient follow-up and remote second opinions.' },
  ];

  const admissionFaqItems = [
    { id: 1, title: 'What documents are required for patient admission?', content: 'Please provide a valid government-issued photo ID, primary health insurance card, physician referral letter, and a current list of all prescribed medications and dosages.' },
    { id: 2, title: 'How does insurance pre-authorization work?', content: 'Our hospital billing desk coordinates directly with your insurance provider within 24 hours to confirm eligible coverage, deductibles, co-pays, and pre-approved clinical procedures.' },
    { id: 3, title: 'Discharge process and take-home medications', content: 'Your attending physician and primary nurse will issue a detailed electronic discharge summary, written prescription refill instructions, and schedule required follow-up consultations.' },
  ];

  const clinicalDeptItems = [
    { id: 'a', title: 'Cardiology & Intensive Heart Care', content: 'Comprehensive cardiovascular diagnostics, catheterization labs, 24/7 cardiac emergency triage, echocardiograms, and post-infarct recovery monitoring.', icon: <FiHeart /> },
    { id: 'b', title: 'Trauma & Emergency Department', content: 'Level-1 trauma center equipped with rapid resuscitation suites, dedicated low-dose CT imaging, and immediate access to on-call surgical specialists.', icon: <FiActivity /> },
    { id: 'c', title: 'Infection Prevention & Sterilization', content: 'Strict hospital-wide sanitation protocols, HEPA-filtered positive pressure operating rooms, automated UV disinfection, and isolation ward controls.', icon: <FiShield /> },
  ];

  const inpatientStatusItems = [
    { id: 'i', title: 'Pathology & Lab Diagnostics', content: 'Comprehensive metabolic panels, blood count profiles, cardiac biomarkers, and urinalysis reports available for physician review.', icon: <FiFileText />, badge: badge('5 New Results', 'indigo') },
    { id: 'u', title: 'Visiting Hours & Ward Regulations', content: 'General ward visits are welcomed from 10:00 AM – 1:00 PM and 5:00 PM – 8:00 PM. Intensive care unit (ICU) visits are restricted to immediate family.', icon: <FiClock />, badge: badge('Visiting Open', 'amber') },
    { id: 'r', title: 'Attending Specialist Consultations', content: 'On-duty physicians from Neurology, Orthopedics, and Nephrology are currently completing ward rounds and inpatient consult requests.', icon: <FiCalendar />, badge: badge('On Duty', 'emerald') },
  ];

  const facilityMediaItems = [
    { id: 'm1', title: 'Modular Surgical Theaters', content: 'Equipped with laminar airflow air sterilization, 4K ultra-HD endoscopic imaging towers, and ergonomic surgical layouts for complex operations.', media: <img src={img1} alt='Modular Surgical Theaters' className='w-full h-40 object-cover' />, icon: <FiImage /> },
    { id: 'm2', title: 'Diagnostic Radiology & 3T MRI Suite', content: 'State-of-the-art diagnostic imaging equipped with high-field 3.0 Tesla MRI, 128-slice dual-source CT scanners, and real-time fluoroscopy.', media: <img src={img2} alt='Diagnostic Radiology' className='w-full h-40 object-cover' />, icon: <FiImage /> },
    { id: 'm3', title: 'Private Inpatient Recovery Rooms', content: 'Restorative recovery suites designed with ergonomic motorized patient beds, ambient circadian lighting, medical gas hookups, and integrated nurse call systems.', media: <img src={img3} alt='Private Patient Room' className='w-full h-40 object-cover' />, icon: <FiImage /> },
  ];

  const pharmacyFlushItems = [
    { id: 'p1', title: '24/7 In-House Central Pharmacy', content: 'Located on the ground floor. Inpatients receive bedside medication delivery with barcode verification; outpatient prescriptions are processed with automated dispensing.' },
    { id: 'p2', title: 'Generic Equivalents & Hospital Formulary', content: 'Hospital pharmacists verify drug safety, screen for contraindications, and dispense FDA-approved formulary equivalents to minimize patient costs.' },
    { id: 'p3', title: 'Cold-Chain Biologics & Vaccines', content: 'Insulin, intravenous biological agents, and temperature-sensitive vaccines are monitored in certified, continuous temperature-logged cold storage units.' },
  ];

  const hipaaGhostItems = [
    { id: 'h1', title: 'Patient Health Privacy & HIPAA Compliance', content: 'All electronic medical histories, lab outcomes, and consultation notes are encrypted end-to-end and strictly protected under federal HIPAA guidelines.' },
    { id: 'h2', title: 'Informed Consent for Surgical Interventions', content: 'Patients receive transparent discussions explaining clinical indications, potential risks, expected outcomes, and surgical alternatives prior to procedures.' },
    { id: 'h3', title: 'Multilingual Medical Translation Support', content: 'On-demand certified medical interpreters and assistive listening devices are available around the clock at no charge for non-native speaking patients.' },
  ];

  const triagePriorityItems = [
    { id: 't1', title: 'Priority 1: Immediate Resuscitation (Code Red)', content: 'Critical life-threatening emergencies (cardiac arrest, severe respiratory failure, major hemorrhagic trauma). Immediate physician and nursing team intervention.', icon: <FiAlertCircle /> },
    { id: 't2', title: 'Priority 2: Emergent Condition (Code Orange)', content: 'High-risk conditions (unstable angina, acute stroke symptoms, severe asthma exacerbation). Clinical assessment and stabilization within 15 minutes.', icon: <FiActivity /> },
    { id: 't3', title: 'Priority 3: Urgent Medical Evaluation (Code Yellow)', content: 'Moderate distress (closed fractures, acute appendicitis symptoms, persistent high fever). Physician assessment within 30 minutes in triage bay.', icon: <FiCheckCircle /> },
  ];

  const orLockdownItems = [
    { id: 'or1', title: 'OR Suite 1 - General & Laparoscopic Surgery (Active)', content: 'Sterilized and certified ready. Scheduled for elective laparoscopic cholecystectomy at 14:30 with Dr. Vance surgical team.' },
    { id: 'or2', title: 'OR Suite 2 - Biohazard Deep Decontamination (Unavailable)', content: 'Currently undergoing mandatory hydrogen peroxide vapor sterilization and biological spore testing. Re-opening at 18:00.', disabled: true },
    { id: 'or3', title: 'OR Suite 3 - Emergency Orthopedic Trauma (Reserved)', content: 'On continuous standby for emergency vehicular trauma intake transferred via air ambulance.' },
  ];

  const densityFaqItems = [
    { id: 'd1', title: 'Patient Registration & Identity Verification', content: 'Patients must confirm verified government photo identification, current health insurance information, and signed clinical treatment consent.' },
    { id: 'd2', title: 'Electronic Prescription Refill Requests', content: 'Refill orders submitted via the patient portal are reviewed and processed by the attending clinical staff within 24 business hours.' },
    { id: 'd3', title: 'Medical Records Release & Diagnostic Discs', content: 'Copies of health summaries, radiology DICOM discs, and operative reports are prepared upon written authorization to Health Information Management.' },
  ];

  return (
    <div className="pt-6 px-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hospital & Clinical Accordions</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Collapsible clinical guidelines, department protocols, and hospital service directories
          </p>
        </div>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/', icon: <FiHome className="w-3.5 h-3.5" /> },
            { label: 'Components' },
            { label: 'UIElements' },
            { label: 'Accordion' },
          ]}
        />
      </div>

      {/* Section 1: Basic & Media Styles */}
      <section className="mb-10">
        <SectionHeader
          number="01"
          title="Clinical Information & Media Styles"
          description="Standard hospital guidelines, department directories, lab badge updates, and facility photos"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Default Accordion */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Patient Admission Protocols</h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Default
              </span>
            </div>
            <Accordion items={admissionFaqItems} defaultOpenIds={[1]} rounded="lg" variant="default" />
          </Card>

          {/* Accordion with Icons */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Clinical Departments & Care</h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Icons
              </span>
            </div>
            <Accordion items={clinicalDeptItems} defaultOpenIds={['a']} rounded="lg" variant="default" />
          </Card>

          {/* Accordion with Badges */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ward Status & Diagnostic Alerts</h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Badges
              </span>
            </div>
            <Accordion items={inpatientStatusItems} rounded="lg" variant="bordered" />
          </Card>

          {/* Accordion with Images/Media */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Hospital Facilities & Wards</h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Media
              </span>
            </div>
            <Accordion items={facilityMediaItems} rounded="xl" variant="shadow" />
          </Card>

          {/* Flush Accordion */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">In-House Pharmacy & Formulary</h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Flush
              </span>
            </div>
            <Accordion items={pharmacyFlushItems} rounded="md" variant="flush" />
          </Card>

          {/* Ghost Accordion */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Patient Rights & Privacy (HIPAA)</h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Ghost
              </span>
            </div>
            <Accordion items={hipaaGhostItems} rounded="lg" variant="ghost" />
          </Card>
        </div>
      </section>

      {/* Section 2: Interactive & Behavior Modes */}
      <section className="mb-10">
        <SectionHeader
          number="02"
          title="Interactive & Behavior Modes"
          description="Single triage level expansion, exclusive focus views, and decommissioned room states"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Single Open Example */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Emergency Triage Levels (Radio-style)</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Only one triage code remains active at any given moment</p>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
                Single Open
              </span>
            </div>
            <Accordion items={triagePriorityItems} defaultOpenIds={['t1']} rounded="lg" variant="bordered" allowMultiple={false} color="indigo" />
          </Card>

          {/* Disabled items + Single-open example */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Surgical Theaters & Sterilization Lockdown</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Decommissioned or locked clinical suites cannot be toggled</p>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Disabled State
              </span>
            </div>
            <Accordion
              rounded="lg"
              variant="bordered"
              allowMultiple={false}
              color="slate"
              items={orLockdownItems}
            />
          </Card>
        </div>
      </section>

      {/* Section 3: Themed Color & Accent Palettes */}
      <section className="mb-10">
        <SectionHeader
          number="03"
          title="Hospital Department Palettes & Accents"
          description="Color-coded departmental panels, priority triage accent stripes, and critical emergency gradients"
        />

        <div className="flex flex-col gap-6">
          {/* Soft Color Accordion (multiple colors) */}
          <Card>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Hospital Clinical Departments (10 Units)</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Ambient soft backgrounds color-coded for distinct medical specialties</p>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                10 Departments
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {DEPARTMENT_PALETTES.map(dept => (
                <Accordion
                  key={`soft-${dept.name}`}
                  items={[
                    { id: `${dept.name}-1`, title: dept.title, content: dept.desc },
                    { id: `${dept.name}-2`, title: 'Clinical Operations', content: 'Specialist round schedules, on-call nurse rosters, and ward contact info.' },
                  ]}
                  rounded="lg"
                  variant="soft-color"
                  color={dept.name}
                />
              ))}
            </div>
          </Card>

          {/* Left Accent Accordion (colored left border) */}
          <Card>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Clinical Triage & Critical Care Accents</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Prominent left border accent indicators for rapid visual prioritization</p>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                6 Accents
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ACCENT_UNITS.map(unit => (
                <Accordion
                  key={`accent-${unit.name}`}
                  items={[
                    { id: `${unit.name}-a`, title: unit.title, content: unit.desc },
                    { id: `${unit.name}-b`, title: 'Standard Operating Procedure', content: 'Staff members must strictly follow Joint Commission healthcare compliance directives.' },
                  ]}
                  rounded="md"
                  variant="left-accent"
                  color={unit.name}
                />
              ))}
            </div>
          </Card>

          {/* Gradient Header Accordions */}
          <Card>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Featured Clinical Centers of Excellence</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">High-visibility vibrant gradient headers for premium specialized centers</p>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                6 Centers
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {GRADIENT_SERVICES.map(srv => (
                <Accordion
                  key={`grad-${srv.name}`}
                  items={[
                    { id: `${srv.name}-g1`, title: srv.title, content: srv.desc },
                    { id: `${srv.name}-g2`, title: 'Physician In-Charge', content: 'Led by board-certified department chairs and dedicated multidisciplinary clinical teams.' },
                  ]}
                  rounded="xl"
                  variant="gradient"
                  color={srv.name}
                />
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Section 4: Density & Sizing */}
      <section className="mb-6">
        <SectionHeader
          number="04"
          title="Density & Clinical Sizing"
          description="Flexible content density scale for electronic health records, nursing stations, and patient portals"
        />

        <Card>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Clinical Information Density</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Select compact (sm) for dense nurse charts, comfortable (md) for bedside tables, and spacious (lg) for patient portals</p>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              3 Densities
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Compact (EHR & Charts)</h4>
                <span className="text-xs font-mono text-gray-400">density='sm'</span>
              </div>
              <Accordion items={densityFaqItems} rounded="md" variant="default" density="sm" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Comfortable (Nursing Station)</h4>
                <span className="text-xs font-mono text-gray-400">density='md'</span>
              </div>
              <Accordion items={densityFaqItems} rounded="md" variant="default" density="md" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Spacious (Patient Portal)</h4>
                <span className="text-xs font-mono text-gray-400">density='lg'</span>
              </div>
              <Accordion items={densityFaqItems} rounded="md" variant="default" density="lg" />
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default AccordionUi;