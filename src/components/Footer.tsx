
const Footer = () => {
  return (
    <footer className="bg-slate-800 dark:bg-slate-950 text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              Global<span className="text-blue-400">Connect</span>
            </div>
            <p className="text-slate-400 dark:text-slate-300 leading-relaxed">
              Your trusted partner for global education and food industry opportunities.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-slate-400 dark:text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Study Abroad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Visa Assistance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">F&B Consulting</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Language Training</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-slate-400 dark:text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Scholarship Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">University List</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-slate-400 dark:text-slate-300">
              <li>📧 info@globalconnect.com</li>
              <li>📱 +82-10-1234-5678</li>
              <li>📍 Seoul, South Korea</li>
              <li>🕒 Mon-Fri: 9AM-6PM KST</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 dark:border-slate-600 pt-8 text-center text-slate-400 dark:text-slate-300">
          <p>&copy; 2024 GlobalConnect. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
