"use client";

import Link from "next/link";
import { ArrowLeft, HelpCircle, ShoppingBag, Truck, CreditCard, RefreshCw } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 3-5 business days within South Africa. Express shipping is available for faster delivery (1-2 business days).",
    category: "shipping"
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days of purchase. Items must be unworn, unwashed, and in their original packaging with all tags attached. Return shipping is free for defective items.",
    category: "returns"
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we ship within South Africa only. International shipping options will be available soon. Please check back for updates.",
    category: "shipping"
  },
  {
    question: "How can I track my order?",
    answer: "You'll receive a tracking number via email once your order ships. You can also check your order status in your account dashboard under 'My Orders'.",
    category: "orders"
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and secure online payment methods. All transactions are encrypted for your security.",
    category: "payment"
  },
  {
    question: "Are your products authentic True Religion?",
    answer: "Yes, all our products are 100% authentic True Religion items. We are an authorized retailer and source directly from True Religion.",
    category: "products"
  },
  {
    question: "How do I know what size to order?",
    answer: "We provide detailed size charts for each product. We recommend measuring yourself and comparing with our size guide. If you're unsure, you can always return items for a different size.",
    category: "products"
  },
  {
    question: "Do you offer free shipping?",
    answer: "Yes, we offer free standard shipping on orders over R1000. For orders under R1000, standard shipping costs R150.",
    category: "shipping"
  },
  {
    question: "Can I cancel my order?",
    answer: "Orders can be cancelled within 2 hours of placement if they haven't been processed for shipping. Please contact our support team immediately if you need to cancel.",
    category: "orders"
  },
  {
    question: "What if my item arrives damaged?",
    answer: "If your item arrives damaged, please take photos and contact our support team within 48 hours of delivery. We'll arrange a replacement or refund.",
    category: "returns"
  },
  {
    question: "Do you have a loyalty program?",
    answer: "We're working on launching a loyalty program soon. Sign up for our newsletter to be notified when it's available.",
    category: "general"
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach us by phone at 079 298 8832 or email at yussuf@alcaponepremium.co.za. Our operating hours are 9:00 AM - 5:00 PM, Monday to Friday.",
    category: "support"
  }
];

const categories = [
  { id: "all", name: "All Questions", icon: HelpCircle },
  { id: "shipping", name: "Shipping & Delivery", icon: Truck },
  { id: "returns", name: "Returns & Exchanges", icon: RefreshCw },
  { id: "orders", name: "Orders", icon: ShoppingBag },
  { id: "payment", name: "Payment", icon: CreditCard },
  { id: "products", name: "Products", icon: HelpCircle },
  { id: "support", name: "Support", icon: HelpCircle },
  { id: "general", name: "General", icon: HelpCircle }
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const filteredFAQs = selectedCategory === "all" 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="bg-purple-100 rounded-full p-3">
              <HelpCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h1>
              <p className="text-gray-600">Find answers to common questions about our products and services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-medium text-gray-900 pr-4">{faq.question}</h3>
                <div className={`transform transition-transform duration-200 ${
                  expandedItems.has(index) ? "rotate-180" : ""
                }`}>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {expandedItems.has(index) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-purple-100 mb-6">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </Link>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <span>Call us: 079 298 8832</span>
              <span>|</span>
              <span>Email: yussuf@alcaponepremium.co.za</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
