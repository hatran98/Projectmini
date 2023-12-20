import useSearchNavigation from "../../hooks/search";
import { useBranch } from "../../hooks/branch";
import { useDepartment } from "../../hooks/department";

function Search() {
  const {
    search,
    setSearch,
    selectedBranch,
    setSelectedBranch,
    selectedDepartment,
    setSelectedDepartment,
    handleSearch,
  } = useSearchNavigation();
  const { branch } = useBranch();
  const { department } = useDepartment();

  return (
    <div className="max-w-6xl container mx-auto shadow pb-4">
      <div className="flex sm:flex-row bg-slate-50">
        <button className="border-none rounded p-5 text-slate-500 font-semibold bg-slate-50">
          Bệnh viện và Phòng Khám
        </button>
        <button className="border-none rounded p-5 text-slate-500 font-semibold bg-slate-50">
          Bác sĩ
        </button>
        <button className="border-none rounded p-5 text-slate-500 font-semibold bg-slate-50">
          Dịch vụ
        </button>
        <button className="border-none rounded p-5 text-slate-500 font-semibold bg-slate-50">
          Chuyên khoa
        </button>
      </div>
      <div className="flex h-12 justify-center gap-4 mt-4 max-w-4xl ml-4">
        <select
          className="text-base"
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          <option selected value="">
            Tất cả vị trí
          </option>
          {branch.map((b) => (
            <option value={b.name}>{b.name}</option>
          ))}
        </select>
        <div className="border rounded h-12 flex w-full">
          <select
            className="text-base"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="" selected>
              Tất cả chuyên khoa
            </option>
            {department.map((d) => (
              <option value={d.name}>{d.name}</option>
            ))}
          </select>
          <input
            placeholder="Tìm kiếm với tên bác sĩ"
            className="border-none text-base w-full"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          ></input>
        </div>
        <div>
          <button
            className="h-12 border rounded w-32 bg-blue-500 text-white"
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
