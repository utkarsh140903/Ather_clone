import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  QuizResults, 
  CategoryScore,
  QuestionCategory,
  ScooterModel
} from '@/types/quiz.types';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail, 
  Share2, 
  Calendar, 
  Check, 
  ChevronRight,
  ArrowRight,
  Bike,
  Zap,
  Battery,
  DollarSign
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// Email form schema
const emailFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z.string().optional(),
});

type EmailFormData = z.infer<typeof emailFormSchema>;

interface ResultsDisplayProps {
  results: QuizResults | null;
  userName: string;
  onRestart: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  userName,
  onRestart
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recommendation');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  // Handler to navigate to NotFound page
  const goToNotFound = () => {
    navigate('/not-found');
  };

  const { register, handleSubmit, formState: { errors } } = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      name: userName || '',
      email: '',
      phone: '',
    }
  });

  // If results are null, show loading or error state
  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h3 className="text-xl font-medium text-ather-darkGray mb-4">
          Calculating your results...
        </h3>
        <div className="w-16 h-16 border-4 border-ather-lightGray border-t-ather-green rounded-full animate-spin"></div>
      </div>
    );
  }

  // Prep data for charts
  const categoryChartData = results.categoryScores.map(category => ({
    name: getCategoryLabel(category.category),
    value: category.percentage,
    color: getCategoryColor(category.category, category.percentage)
  }));

  // Format savings data for chart
  const savingsChartData = [
    {
      name: 'Fuel',
      savings: results.savingsEstimates.fuelSavings,
    },
    {
      name: 'Maintenance',
      savings: results.savingsEstimates.maintenanceSavings,
    }
  ];

  // Convert categories to human-readable labels
  function getCategoryLabel(category: QuestionCategory): string {
    switch (category) {
      case QuestionCategory.COMMUTE:
        return 'Commute';
      case QuestionCategory.CHARGING:
        return 'Charging';
      case QuestionCategory.BUDGET:
        return 'Budget';
      case QuestionCategory.RIDING:
        return 'Riding';
      case QuestionCategory.SUSTAINABILITY:
        return 'Sustainability';
      case QuestionCategory.PRACTICAL:
        return 'Practical';
      default:
        return category;
    }
  }

  // Get chart color based on category and score
  function getCategoryColor(category: QuestionCategory, score: number): string {
    // Base color determined by score
    if (score >= 80) return '#66CC33'; // Ather green
    if (score >= 60) return '#99DD66'; // Lighter green
    if (score >= 40) return '#FFCC33'; // Yellow
    return '#FF6633'; // Red
  }

  // Handle email form submission
  const onSubmitEmail = (data: EmailFormData) => {
    console.log('Form data submitted:', data);
    // Here you would typically send this data to your backend or CRM
    // For now, we'll just show a success message
    setEmailSubmitted(true);
  };

  // Handle social sharing
  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'email') => {
    const url = window.location.href;
    const text = `I'm ${results.overallPercentage}% compatible with an Ather electric scooter! Check out your compatibility:`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('My Ather Compatibility Results')}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
        break;
    }
    
    window.open(shareUrl, '_blank');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Score animation variant
  const scoreVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.3
      }
    }
  };

  // Render the recommended scooter card
  const renderScooterCard = (scooter: ScooterModel, isMainRecommendation: boolean) => (
    <Card className={`overflow-hidden transition-all ${isMainRecommendation ? 'border-ather-green shadow-lg' : 'hover:border-ather-green'}`}>
      <CardHeader className={`${isMainRecommendation ? 'bg-ather-green text-white' : 'bg-ather-lightGray'}`}>
        <div className="flex justify-between items-center">
          <CardTitle>{scooter.name}</CardTitle>
          {isMainRecommendation && (
            <div className="bg-white text-ather-green text-xs font-bold py-1 px-2 rounded-full flex items-center">
              <Check size={12} className="mr-1" />
              Best Match
            </div>
          )}
        </div>
        <CardDescription className={`${isMainRecommendation ? 'text-white/90' : ''} whitespace-normal break-words`}>
          {scooter.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-4 mt-3">
          <div className="flex flex-col">
            <span className="text-xs text-ather-gray">Range</span>
            <span className="font-medium flex items-center">
              <Battery size={16} className="mr-1 text-ather-green" />
              {scooter.range} km
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-ather-gray">Top Speed</span>
            <span className="font-medium flex items-center">
              <Zap size={16} className="mr-1 text-ather-green" />
              {scooter.topSpeed} km/h
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-ather-gray">Charging</span>
            <span className="font-medium flex items-center">
              <span className="mr-1">🔌</span>
              {scooter.chargingTime} hrs
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-ather-gray">Price</span>
            <span className="font-medium flex items-center">
              <DollarSign size={16} className="mr-1 text-ather-green" />
              ₹{scooter.price.toLocaleString()}
            </span>
          </div>
        </div>
        
        <h4 className="font-medium mb-2">Key Features</h4>
        <ul className="text-sm text-ather-gray space-y-1">
          {scooter.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check size={16} className="mr-2 text-ather-green shrink-0 mt-0.5" />
              <span className="break-words whitespace-normal">{feature}</span>
            </li>
          ))}
          {scooter.features.length > 3 && (
            <li className="text-ather-green text-xs">+{scooter.features.length - 3} more features</li>
          )}
        </ul>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4">
        <Button 
          onClick={goToNotFound}
          className={`w-full ${isMainRecommendation ? 'bg-ather-green hover:bg-ather-green/90' : 'border-ather-green text-ather-green bg-white hover:bg-ather-lightGray'}`}
        >
          Learn More <ChevronRight size={16} className="ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col w-full h-full overflow-y-auto max-h-[90vh] pb-6 pr-2"
    >
      {/* Header with score */}
      <motion.div 
        variants={itemVariants}
        className="text-center mb-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-ather-darkGray mb-2">
          {userName ? `${userName}, y` : 'Y'}our Ather Compatibility
        </h2>
        <p className="text-ather-gray mb-6">
          Based on your answers, here's how well an Ather scooter fits your lifestyle
        </p>
        
        <motion.div 
          variants={scoreVariants}
          className="relative mx-auto w-40 h-40 flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-ather-green to-green-400 opacity-10"></div>
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <div className="text-center">
              <span className="block text-5xl font-bold text-ather-green">
                {results.overallPercentage}%
              </span>
              <span className="text-sm text-ather-gray">compatible</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Tabs for different result sections */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="recommendation" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
          </TabsList>
          
          {/* Recommendation Tab */}
          <TabsContent value="recommendation" className="pt-4">
            <motion.div
              animate={{ opacity: activeTab === 'recommendation' ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-ather-darkGray mb-2">
                Your Recommended Scooter
              </h3>
              <p className="text-sm text-ather-gray mb-4">
                Based on your preferences, we think this is the perfect match for you:
              </p>
              
              {/* Primary recommendation */}
              <div className="mb-6">
                {renderScooterCard(results.recommendation.bestMatch, true)}
              </div>
              
              {/* Alternative models */}
              {results.recommendation.alternativeModels.length > 0 && (
                <>
                  <h4 className="text-lg font-medium text-ather-darkGray mb-3">
                    Alternative Options
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {results.recommendation.alternativeModels.map((model, index) => (
                      <div key={model.id}>
                        {renderScooterCard(model, false)}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </TabsContent>
          
          {/* Analysis Tab */}
          <TabsContent value="analysis" className="pt-4">
            <motion.div
              animate={{ opacity: activeTab === 'analysis' ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-ather-darkGray mb-2">
                Compatibility Analysis
              </h3>
              <p className="text-sm text-ather-gray mb-4">
                Here's how your preferences match with Ather's capabilities across different categories:
              </p>
              
              {/* Chart */}
              <div className="h-64 mb-6 overflow-visible">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryChartData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                    <Bar 
                      dataKey="value" 
                      radius={[0, 4, 4, 0]}
                    >
                      {categoryChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Categories explanation */}
              <div className="space-y-4 overflow-y-auto max-h-[65vh] pr-2 pb-2">
                {results.categoryScores.map((category) => (
                  <Card key={category.category} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{getCategoryLabel(category.category)}</CardTitle>
                        <span 
                          className={`text-sm font-bold px-2 py-0.5 rounded-full ${
                            category.percentage >= 80 
                              ? 'bg-green-100 text-green-700' 
                              : category.percentage >= 60 
                                ? 'bg-yellow-100 text-yellow-700' 
                                : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {Math.round(category.percentage)}%
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-ather-gray whitespace-normal break-words">
                        {getCategoryDescription(category.category, category.percentage)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>
          
          {/* Savings Tab */}
          <TabsContent value="savings" className="pt-4">
            <motion.div
              animate={{ opacity: activeTab === 'savings' ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-ather-darkGray mb-2">
                Your Potential Savings
              </h3>
              <p className="text-sm text-ather-gray mb-4">
                Switching to an Ather electric scooter can save you money and reduce emissions:
              </p>
              
              {/* Financial Impact */}
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <DollarSign className="mr-2 text-ather-green" size={20} />
                    Financial Impact
                  </CardTitle>
                  <CardDescription>
                    Estimated annual savings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-4 bg-ather-lightGray rounded-lg">
                      <p className="text-sm text-ather-gray mb-1">Fuel Savings</p>
                      <p className="text-2xl font-bold text-ather-green">
                        ₹{results.savingsEstimates.fuelSavings.toLocaleString()}
                      </p>
                      <p className="text-xs text-ather-gray">per year</p>
                    </div>
                    <div className="text-center p-4 bg-ather-lightGray rounded-lg">
                      <p className="text-sm text-ather-gray mb-1">Maintenance</p>
                      <p className="text-2xl font-bold text-ather-green">
                        ₹{results.savingsEstimates.maintenanceSavings.toLocaleString()}
                      </p>
                      <p className="text-xs text-ather-gray">per year</p>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-ather-green">
                    <p className="text-sm font-medium text-ather-darkGray mb-1">
                      Total Estimated Savings
                    </p>
                    <p className="text-3xl font-bold text-ather-green">
                      ₹{results.savingsEstimates.totalSavings.toLocaleString()}
                    </p>
                    <p className="text-xs text-ather-gray">per year</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Environmental Impact */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <span role="img" aria-label="leaf" className="mr-2">🌿</span>
                    Environmental Impact
                  </CardTitle>
                  <CardDescription>
                    Reducing your carbon footprint
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span role="img" aria-label="car" className="text-2xl">🚗</span>
                      <span className="text-xl">→</span>
                      <span role="img" aria-label="electric scooter" className="text-2xl">⚡🛵</span>
                    </div>
                    <p className="text-3xl font-bold text-green-600 mb-1">
                      {results.savingsEstimates.co2Reduction.toLocaleString()} kg
                    </p>
                    <p className="text-sm text-ather-gray">
                      CO₂ reduction per year
                    </p>
                    <p className="text-xs text-ather-gray mt-2 whitespace-normal break-words">
                      That's equivalent to planting approximately{' '}
                      <span className="font-bold">{Math.round(results.savingsEstimates.co2Reduction / 22)}</span> trees!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
      
      {/* Share and Save Section */}
      <motion.div variants={itemVariants} className="mt-8 border-t pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Social Share */}
          <div className="flex-1">
            <h4 className="text-lg font-medium text-ather-darkGray mb-3">
              Share Your Results
            </h4>
            <p className="text-sm text-ather-gray mb-4">
              Let your friends know about your Ather compatibility!
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                onClick={goToNotFound}
              >
                <Facebook size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full hover:bg-blue-50 hover:text-blue-400 hover:border-blue-200"
                onClick={goToNotFound}
              >
                <Twitter size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                onClick={goToNotFound}
              >
                <Linkedin size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                onClick={goToNotFound}
              >
                <Mail size={18} />
              </Button>
            </div>
          </div>
          
          {/* Email Capture */}
          <div className="flex-1">
            {!emailSubmitted ? (
              <>
                <h4 className="text-lg font-medium text-ather-darkGray mb-3">
                  Save Your Results
                </h4>
                <p className="text-sm text-ather-gray mb-4">
                  We'll email you a detailed report with your compatibility results.
                </p>
                <form onSubmit={handleSubmit(onSubmitEmail)} className="space-y-3">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      {...register("name")} 
                      className={`${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      {...register("email")} 
                      className={`${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input id="phone" {...register("phone")} />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-ather-green hover:bg-ather-green/90"
                  >
                    Email My Results
                  </Button>
                </form>
              </>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <Check size={40} className="text-ather-green mx-auto mb-2" />
                <h4 className="text-lg font-medium text-ather-darkGray mb-1">
                  Results Sent!
                </h4>
                <p className="text-sm text-ather-gray whitespace-normal break-words">
                  We've emailed your detailed compatibility report. Check your inbox!
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* CTA Section */}
      <motion.div 
        variants={itemVariants} 
        className="mt-8 bg-ather-green/10 p-6 rounded-xl border border-ather-green/20"
      >
        <div className="text-center">
          <h3 className="text-xl font-bold text-ather-darkGray mb-2">
            Ready to Experience Ather?
          </h3>
          <p className="text-ather-gray mb-4 max-w-lg mx-auto whitespace-normal break-words">
            Book a test ride at your nearest Ather Experience Center and feel the difference yourself.
          </p>
          <Button 
            size="lg" 
            onClick={goToNotFound}
            className="bg-ather-green hover:bg-ather-green/90 text-white"
          >
            <Calendar size={18} className="mr-2" />
            Book a Test Ride
          </Button>
        </div>
      </motion.div>
      
      {/* Restart Quiz */}
      <motion.div variants={itemVariants} className="mt-6 text-center">
        <Button variant="link" onClick={onRestart} className="text-ather-gray hover:text-ather-green">
          Retake the quiz
        </Button>
      </motion.div>
    </motion.div>
  );
};

// Helper function to generate category descriptions based on score
function getCategoryDescription(category: QuestionCategory, score: number): string {
  if (score >= 80) {
    switch (category) {
      case QuestionCategory.COMMUTE:
        return "Your daily commute is ideally suited for an Ather's range and capabilities.";
      case QuestionCategory.CHARGING:
        return "You have excellent access to charging options, making an Ather very convenient for you.";
      case QuestionCategory.BUDGET:
        return "An Ather scooter aligns perfectly with your budget considerations.";
      case QuestionCategory.RIDING:
        return "Your riding preferences match exceptionally well with Ather's performance characteristics.";
      case QuestionCategory.SUSTAINABILITY:
        return "Your environmental values strongly align with Ather's zero-emission technology.";
      case QuestionCategory.PRACTICAL:
        return "An Ather scooter meets your practical needs very well.";
      default:
        return "You're highly compatible in this category.";
    }
  } else if (score >= 60) {
    switch (category) {
      case QuestionCategory.COMMUTE:
        return "Your commute is well-suited for an Ather's range, though some longer trips might require planning.";
      case QuestionCategory.CHARGING:
        return "You have adequate charging options, but might benefit from additional charging points.";
      case QuestionCategory.BUDGET:
        return "An Ather scooter is a good match for your budget, with some considerations to keep in mind.";
      case QuestionCategory.RIDING:
        return "Your riding preferences align well with what Ather offers, with some minor trade-offs.";
      case QuestionCategory.SUSTAINABILITY:
        return "Your environmental consciousness makes an electric scooter a good choice for you.";
      case QuestionCategory.PRACTICAL:
        return "An Ather scooter meets most of your practical needs with some adaptations.";
      default:
        return "You have good compatibility in this category.";
    }
  } else if (score >= 40) {
    switch (category) {
      case QuestionCategory.COMMUTE:
        return "Your commute presents some challenges for an electric scooter's range, but might still be workable.";
      case QuestionCategory.CHARGING:
        return "Limited charging access might be challenging but not impossible with proper planning.";
      case QuestionCategory.BUDGET:
        return "An Ather scooter might stretch your budget, but could pay off in the long run.";
      case QuestionCategory.RIDING:
        return "Some of your riding preferences might not perfectly match Ather's offerings.";
      case QuestionCategory.SUSTAINABILITY:
        return "An electric scooter could help you become more environmentally conscious.";
      case QuestionCategory.PRACTICAL:
        return "You might need to adjust some of your practical needs to accommodate an electric scooter.";
      default:
        return "You have moderate compatibility in this category.";
    }
  } else {
    switch (category) {
      case QuestionCategory.COMMUTE:
        return "Your commute may exceed the typical range of an electric scooter, requiring significant adaptations.";
      case QuestionCategory.CHARGING:
        return "Limited charging infrastructure in your area could present significant challenges.";
      case QuestionCategory.BUDGET:
        return "An Ather scooter may be beyond your current budget constraints.";
      case QuestionCategory.RIDING:
        return "Your riding preferences differ substantially from what electric scooters typically offer.";
      case QuestionCategory.SUSTAINABILITY:
        return "Environmental factors aren't currently a priority in your vehicle choice.";
      case QuestionCategory.PRACTICAL:
        return "Your practical needs might be better served by a different type of vehicle.";
      default:
        return "This category shows lower compatibility with an electric scooter.";
    }
  }
}

