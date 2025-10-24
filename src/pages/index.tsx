import birds from "@/data/birds.json";
import { useEffect, useState } from "react";
import Select from '@/components/select';
import BirdCard from '@/components/bird-card';
import Toggle from '@/components/toggle';
import Head from 'next/head';

export default function BirdListPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [category, setCategory] = useState("Sve");
  const [lecture, setLecture] = useState("Sve");
  const [examType, setExamType] = useState("Izgled i/ili glasanje");

  const [groupByCategory, setGroupByCategory] = useState(true);

  const categories = ["Sve", ...new Set(birds.map(b => b.category))];
  const lectures = ["Sve", ...new Set(birds.map(b => b.lecture))];
  const examTypes = ["Izgled i/ili glasanje", "Izgled", "Glasanje", "Izgled i glasanje", "Samo izgled", "Samo glasanje"];

  const filtered = birds
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

  const grouped = filtered.reduce((acc: Record<string, typeof birds>, bird) => {
    if (!acc[bird.category]) {
      acc[bird.category] = [];
    }
    acc[bird.category].push(bird);
    return acc;
  }, {});

  const reset = () => {
    setCategory("Sve");
    setLecture("Sve");
    setExamType("Izgled i/ili glasanje");
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

  return (
    <div className="space-y-4 md:space-y-12">
      <Head>
        <title>Ptice ispita</title>
      </Head>
      <h1 className="container-padding-x text-4xl font-bold text-gray-900">Ptice ispita</h1>

      <div className="container-padding-x flex gap-4 items-center flex-wrap 2xl:sticky 2xl:top-0 bg-white z-[30] py-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Pretraži po nazivu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="min-w-full md:min-w-0 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Select
          label="Kategorija"
          options={categories}
          value={category}
          onChange={setCategory}
        />
        <Select
          label="Predavanje"
          options={lectures}
          value={lecture}
          onChange={setLecture}
        />
        <Select
          label="Tip ispita"
          options={examTypes}
          value={examType}
          onChange={setExamType}
        />
        <Toggle
          label="Grupiraj"
          value={groupByCategory}
          onChange={setGroupByCategory}
        />
        <button
          className="btn-primary"
          onClick={reset}
        >
          Resetiraj
        </button>
        <p className="text-xs text-gray-500" title="prikazano od ukupno">{filtered.length}/{birds.length}</p>
      </div>


      <ul className="container-padding-x flex gap-4 flex-wrap">
        {groupByCategory ? Object.entries(grouped).map(([category, birdsInCategory]) => (
          <li key={category} className="w-full mt-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{category}</h2>
            <ul className="flex gap-4 flex-wrap">
              {birdsInCategory.map(bird => (
                <li
                  key={bird.id}
                  className="border border-gray-300 rounded-lg hover:shadow-lg transition-shadow w-64 h-64"
                >
                  <BirdCard bird={bird} />
                </li>
              ))}
            </ul>
          </li>
        )) : (
          filtered.map(bird => (
            <li
              key={bird.id}
              className="border border-gray-300 rounded-lg hover:shadow-lg transition-shadow w-64 h-64"
            >
            <BirdCard bird={bird} />
          </li>
        )))}
      </ul>
    </div>
  );
}
