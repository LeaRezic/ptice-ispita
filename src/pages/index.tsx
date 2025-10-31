import birds from "@/data/birds.json";
import { useEffect, useState } from "react";
import Select from '@/components/select';
import BirdCard from '@/components/bird-card';
import Head from 'next/head';
import { Bird } from '@/types/bird';
import Input from '@/components/input';

const LECTURES = ["Sve", "Ptice gradskih staništa", "Vodarice i kokoške", "Grabljivice", "Djetlovke, smrdovrane, preostale pjevice", "Cvrkutuše"];
const EXAM_TYPES = ["Izgled i/ili glasanje", "Izgled", "Glasanje", "Izgled i glasanje", "Samo izgled", "Samo glasanje"];
const GROUPING = ["Skupine", "Skupine i podskupine", "Bez grupiranja"];

export default function BirdListPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [category, setCategory] = useState("Sve");
  const [lecture, setLecture] = useState("Sve");
  const [examType, setExamType] = useState("Izgled i/ili glasanje");
  const [grouping, setGrouping] = useState("Skupine");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const categories = ["Sve", ...[...new Set(birds.map(b => b.category))].sort((a, b) => a.localeCompare(b, 'hr', { sensitivity: 'base' }))];

  const filteredBirds = birds
    .filter((b) => {
      const categoryMatch = category === "Sve" || b.category === category;
      const lectureMatch = lecture === "Sve" || b.lecture === lecture;
      let examMatch = false;
      if (examType === "Izgled i/ili glasanje") {
        examMatch = true;
      } else if (examType === "Izgled") {
        examMatch = b.pictureExam;
      } else if (examType === "Glasanje") {
        examMatch = b.audioExam;
      } else if (examType === "Izgled i glasanje") {
        examMatch = b.pictureExam && b.audioExam;
      } else if (examType === "Samo izgled") {
        examMatch = b.pictureExam && !b.audioExam;
      } else if (examType === "Samo glasanje") {
        examMatch = !b.pictureExam && b.audioExam;
      }
      const searchMatch = debouncedSearch === "" ||
        b.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        b.nameEnglish.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        b.nameLatin.toLowerCase().includes(debouncedSearch.toLowerCase());
      return categoryMatch && lectureMatch && examMatch && searchMatch;
    })
    .sort((a, b) => a.textbookPage - b.textbookPage);

  const groupedBirds = filteredBirds.reduce((acc: Record<string, Bird[]>, bird) => {
    if (!acc[bird.category]) {
      acc[bird.category] = [];
    }
    acc[bird.category].push(bird);
    return acc;
  }, {});

  const subGroupedBirds = Object.keys(groupedBirds).reduce((acc, category) => {
    if (groupedBirds[category].some((b) => b.subCategory !== category)) {
      acc[category] = groupedBirds[category].reduce((acc: Record<string, Bird[]>, bird) => {
        if (!acc[bird.subCategory]) {
          acc[bird.subCategory] = [];
        }
        acc[bird.subCategory].push(bird);
        return acc;
      }, {})
    } else {
      acc[category] = groupedBirds[category];
    }
    return acc;
  }, {} as Record<string, Record<string, Bird[]> | Bird[]>);

  const reset = () => {
    setCategory("Sve");
    setLecture("Sve");
    setExamType("Izgled i/ili glasanje");
    setGrouping("Skupine");
    setSearch("");
    setDebouncedSearch("");
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="space-y-4 md:space-y-12 min-w-full">
      <Head>
        <title>Ptice ispita</title>
      </Head>
      <h1 className="container-padding-x text-4xl font-bold text-gray-900 dark:text-gray-100">Ptice ispita</h1>

      <div className="container-padding-x grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-stretch 3xl:sticky 3xl:top-0 bg-white dark:bg-gray-950 z-[30] py-4 border-b border-gray-200">
        <Input
          label="Ptičica"
          placeholder="Pretraži po nazivu ptice..."
          value={search}
          onChange={setSearch}
        />
        <Select
          label="Skupina"
          options={categories}
          value={category}
          onChange={setCategory}
        />
        <Select
          label="Predavanje"
          options={LECTURES}
          value={lecture}
          onChange={setLecture}
        />
        <Select
          label="Tip ispita"
          options={EXAM_TYPES}
          value={examType}
          onChange={setExamType}
        />
        <Select
          label="Grupiranje"
          options={GROUPING}
          value={grouping}
          onChange={setGrouping}
        />
        <div className="flex items-center gap-2">
          <span className="md:min-w-[96] font-medium text-gray-700 dark:text-gray-300">Prikazano </span>
          <p className="text-xs text-gray-500 dark:text-gray-300" title="prikazano / ukupno">{filteredBirds.length}/{birds.length}</p>
          <button
            className="btn-primary ml-2"
            onClick={reset}
          >
            Resetiraj
          </button>
        </div>
      </div>


      <ul className="container-padding-x flex gap-2 lg:gap-4 flex-wrap">
        {grouping === "Skupine" && Object.entries(groupedBirds).map(([category, birdsInCategory]) => (
          <li key={category} className="w-full mt-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">{category}</h2>
            <ul className="flex gap-2 lg:gap-4 flex-wrap">
              {birdsInCategory.map(bird => (
                <li
                  key={bird.id}
                  className="border border-gray-300 bg-white text-gray-900 rounded-lg hover:shadow-lg transition-shadow w-full xs:w-48 lg:w-64 h-auto lg:h-64"
                >
                  <BirdCard bird={bird} />
                </li>
              ))}
            </ul>
          </li>
        ))}

        {grouping === "Skupine i podskupine" && Object.entries(subGroupedBirds).map(([category, birdsInCategory]) => (
          <li key={category} className="w-full mt-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">{category}</h2>
            <ul className="flex gap-2 lg:gap-4 flex-wrap">
              {Array.isArray(birdsInCategory) ? birdsInCategory.map(bird => (
                <li
                  key={bird.id}
                  className="border border-gray-300 bg-white text-gray-900 rounded-lg hover:shadow-lg transition-shadow w-full xs:w-48 lg:w-64 h-auto lg:h-64"
                >
                  <BirdCard bird={bird} />
                </li>
              )) : Object.entries(birdsInCategory).map(([subCategory, birdsInSubCategory]) => (
                <li key={subCategory} className="w-full mt-4">
                  <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">{subCategory}</h3>
                  <ul className="flex gap-2 lg:gap-4 flex-wrap">
                    {birdsInSubCategory.map(bird => (
                      <li
                        key={bird.id}
                        className="border border-gray-300 bg-white text-gray-900 rounded-lg hover:shadow-lg transition-shadow w-full xs:w-48 lg:w-64 h-auto lg:h-64"
                      >
                        <BirdCard bird={bird} />
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}

        {grouping === "Bez grupiranja" && filteredBirds.map(bird => (
            <li
              key={bird.id}
              className="border border-gray-300 bg-white text-gray-900 rounded-lg hover:shadow-lg transition-shadow w-full xs:w-48 lg:w-64 h-auto lg:h-64"
            >
            <BirdCard bird={bird} />
          </li>
        ))}
      </ul>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed left-1/2 xs:left-auto transform -translate-x-1/2 xs:-translate-x-0 bottom-6 xs:right-6 z-50 bg-slate-500 hover:bg-slate-600 text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 cursor-pointer"
          aria-label="Odi na vrh stranice"
        >
          <svg
            className="w-4 h-4 lg:w-6 lg:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
