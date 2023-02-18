import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import {createPortal} from 'react-dom'
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';
import GetImage from '../hooks/GetImage';
import SearchComponent from './SearchComponent';
const image = require("../images/react_log.png")
const addImage = require('../images/addIcon.png')

export const Navbar = ({user}) => {

    let navigate = useNavigate();
    const [loginModal,setLoginModal] = useState(false)
    const [registerModal,setRegisterModal] = useState(false)
    const [imageURL,setImageURL] = useState(null)
    const [userID,setUserID] = useState(null)
    const logout = () => {
        axios.delete('http://localhost:3001/api/auth/logout',{withCredentials: true}).then(data => console.log("DONE"))
    }
    
    const createOrRetrieve = async () => {
        let id;
        await axios.get('http://localhost:3001/api/blog/last-draft',{withCredentials: true})
        .then(data => {id = data.data})
        .catch(err => console.log("ERROR",err))
        navigate(`${id}/edit-post`)
    }

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:3001/api/image/url/${user.profile_picture}`,{withCredentials: true})
            .then(data => {setImageURL(data.data)})
            .catch(err => console.log("ERROR GETTING URL"))
            setUserID(user._id)
        }
        
    },[user])

    console.log("Navbar user",user)
    return (
        <nav className="bg-white shadow-md h-12 flex justify-between items-center">
            <div className="ml-4 flex justify-center items-center">
                <a className="navbar-brand" href="/">
                    <svg xmlns="http://www.w3.org/2000/svg"  className="max-h-8" viewBox="0 0 100 100" width="40px" height="40px"><path d="M 50.003906 8 A 1.0001 1.0001 0 0 0 49.212891 8.3828125 L 43.712891 15.382812 A 1.0001 1.0001 0 0 0 44.5 17 L 46.5 17 L 46.5 19.279297 L 41.183594 21.050781 A 1.0001 1.0001 0 0 0 41.183594 22.949219 L 45.066406 24.244141 C 41.240723 24.501465 37.739751 24.972069 35.126953 25.726562 C 33.540586 26.184656 32.238556 26.713033 31.255859 27.363281 C 30.273162 28.01353 29.5 28.878341 29.5 30 C 29.5 30.877114 30.002053 31.622804 30.660156 32.1875 C 30.790315 32.299184 30.934444 32.403957 31.080078 32.507812 C 28.720512 34.608524 26.328644 37.187395 23.828125 40.400391 C 18.242696 47.578503 13.856379 49.347744 10.986328 49.496094 C 8.116277 49.644443 6.6777344 48.263672 6.6777344 48.263672 A 1.0001 1.0001 0 0 0 5.0898438 49.412109 C 5.0898438 49.412109 6.4167568 52.386144 9.1269531 54.716797 C 11.253926 56.545902 14.410683 57.871351 18.226562 57.082031 C 15.300042 61.031042 10.259766 69.086181 10.259766 78.429688 C 10.259766 82.334225 11.860506 85.219636 14.203125 87.134766 C 16.545744 89.049896 19.563409 90.054119 22.525391 90.589844 C 28.449354 91.661292 34.28125 90.84375 34.28125 90.84375 A 1.0001 1.0001 0 0 0 34.880859 89.173828 C 34.880859 89.173828 33.891733 88.10644 32.902344 86.634766 C 32.133357 85.490937 31.541836 84.16393 31.257812 83 L 41.927734 83 C 44.523288 84.687076 47.352665 86 50 86 C 52.812495 86 55.688288 84.66787 58.216797 83 L 68.681641 83 C 68.337793 84.12213 67.642083 85.428479 66.722656 86.5625 C 65.528842 88.034951 64.332031 89.109375 64.332031 89.109375 A 1.0001 1.0001 0 0 0 64.869141 90.845703 C 64.869141 90.845703 70.979443 91.660046 77.175781 90.591797 C 80.27395 90.057672 83.423464 89.05922 85.873047 87.150391 C 88.322629 85.241561 90.011719 82.34708 90.011719 78.429688 C 90.011719 68.689423 85.366202 61.136147 83.039062 57.962891 C 88.358667 57.897711 91.553571 56.096112 93.169922 53.982422 C 95.001826 51.586855 95 49 95 49 A 1.0001 1.0001 0 0 0 93.308594 48.277344 C 93.308594 48.277344 91.943835 49.643551 89.148438 49.496094 C 86.353039 49.348636 82.029675 47.582985 76.441406 40.402344 C 73.904698 37.142847 71.458147 34.534266 69.035156 32.417969 C 69.137422 32.341347 69.245693 32.268287 69.339844 32.1875 C 69.997947 31.622804 70.5 30.877114 70.5 30 C 70.5 28.878282 69.726873 28.013607 68.744141 27.363281 C 67.761409 26.712955 66.459423 26.184594 64.873047 25.726562 C 62.260233 24.972172 58.759253 24.501399 54.933594 24.244141 L 58.816406 22.949219 A 1.0001 1.0001 0 0 0 58.816406 21.050781 L 53.5 19.279297 L 53.5 17 L 55.5 17 A 1.0001 1.0001 0 0 0 56.287109 15.382812 L 50.787109 8.3828125 A 1.0001 1.0001 0 0 0 50.003906 8 z M 50 10.619141 L 53.441406 15 L 52.5 15 A 1.0001 1.0001 0 0 0 51.5 16 L 51.5 20 A 1.0001 1.0001 0 0 0 52.183594 20.949219 L 55.335938 22 L 52.183594 23.050781 A 1.0001 1.0001 0 0 0 51.5 24 L 51.5 25.046875 A 1.0001 1.0001 0 0 0 52.466797 26.044922 C 57.195523 26.20031 61.385659 26.802248 64.316406 27.648438 C 65.78178 28.071531 66.933669 28.56342 67.640625 29.03125 C 68.347581 29.49908 68.5 29.849718 68.5 30 C 68.5 30.116886 68.43385 30.329493 68.037109 30.669922 C 67.640369 31.010351 66.956248 31.404892 66.044922 31.767578 C 65.20593 32.101478 63.654764 32.291605 62.476562 32.570312 C 62.477709 32.543467 62.5 32.527356 62.5 32.5 C 62.5 31.692034 61.97498 31.09148 61.396484 30.681641 C 60.817989 30.271801 60.095329 29.962195 59.230469 29.689453 C 57.500749 29.143969 55.192291 28.775009 52.556641 28.625 A 1.0001 1.0001 0 0 0 51.5 29.623047 L 51.5 35 A 1.0001 1.0001 0 0 0 51.792969 35.707031 L 53.121094 37.037109 L 50 40.503906 L 46.878906 37.037109 L 48.207031 35.707031 A 1.0001 1.0001 0 0 0 48.5 35 L 48.5 29.623047 A 1.0001 1.0001 0 0 0 47.443359 28.625 C 44.807709 28.775009 42.499251 29.143969 40.769531 29.689453 C 39.904671 29.962195 39.182011 30.271801 38.603516 30.681641 C 38.02502 31.09148 37.5 31.692034 37.5 32.5 C 37.5 32.52734 37.522288 32.543483 37.523438 32.570312 C 36.345234 32.291607 34.79407 32.101478 33.955078 31.767578 C 33.043752 31.404892 32.359631 31.010351 31.962891 30.669922 C 31.56615 30.329493 31.5 30.116886 31.5 30 C 31.5 29.850159 31.652385 29.499064 32.359375 29.03125 C 33.066365 28.563436 34.218211 28.071593 35.683594 27.648438 C 38.61436 26.802124 42.804511 26.200309 47.533203 26.044922 A 1.0001 1.0001 0 0 0 48.5 25.046875 L 48.5 24 A 1.0001 1.0001 0 0 0 47.816406 23.050781 L 44.664062 22 L 47.816406 20.949219 A 1.0001 1.0001 0 0 0 48.5 20 L 48.5 16 A 1.0001 1.0001 0 0 0 47.5 15 L 46.558594 15 L 50 10.619141 z M 46.5 30.787109 L 46.5 31.294922 C 45.538882 31.626549 43.945104 32.320468 42.28125 33.783203 A 1.0001 1.0001 0 0 0 41.851562 33.541016 C 40.956512 33.294396 40.258374 33.00314 39.863281 32.751953 C 39.67415 32.63171 39.590672 32.548147 39.546875 32.5 C 39.579512 32.462878 39.626978 32.408529 39.759766 32.314453 C 40.064395 32.098636 40.629454 31.831539 41.371094 31.597656 C 42.601023 31.209786 44.517157 30.965663 46.5 30.787109 z M 53.5 30.787109 C 55.482843 30.965663 57.398977 31.209786 58.628906 31.597656 C 59.370546 31.831539 59.935605 32.098636 60.240234 32.314453 C 60.371728 32.407611 60.418199 32.460708 60.451172 32.498047 C 60.407213 32.546369 60.325268 32.632109 60.136719 32.751953 C 59.74141 33.003218 59.043033 33.294392 58.148438 33.541016 A 1.0001 1.0001 0 0 0 58.537109 35.498047 C 61.869978 35.087989 64.701105 34.453627 66.783203 33.625 C 66.921473 33.569972 67.047931 33.51181 67.179688 33.455078 C 69.65558 35.5375 72.19442 38.201556 74.863281 41.630859 C 80.663012 49.083218 85.511366 51.307848 89.042969 51.494141 C 90.447547 51.568231 91.55229 51.275729 92.464844 50.929688 C 92.255272 51.515969 92.085151 52.107099 91.580078 52.767578 C 90.161983 54.622011 87.347436 56.486311 81.076172 56.003906 A 1.0001 1.0001 0 0 0 80.712891 56.044922 A 0.50005 0.50005 0 0 0 80.5 56 C 78.581377 56 76.795633 55.854754 75.138672 55.599609 A 0.50005 0.50005 0 0 0 75.039062 55.591797 A 0.50005 0.50005 0 0 0 74.986328 56.587891 C 76.547093 56.828222 78.222015 56.967087 80.001953 56.990234 A 1.0001 1.0001 0 0 0 80.257812 57.669922 C 80.257812 57.669922 88.011719 66.284562 88.011719 78.429688 C 88.011719 81.797793 86.697011 83.972877 84.644531 85.572266 C 82.592051 87.171655 79.740519 88.120344 76.835938 88.621094 C 72.696146 89.334794 69.308565 89.171896 67.267578 89.009766 C 67.772637 88.523047 68.327145 87.936692 68.902344 87.132812 C 69.177206 86.748674 69.447111 86.310442 69.712891 85.847656 C 69.737836 85.807553 69.75869 85.764998 69.783203 85.724609 C 70.081856 85.232551 70.342927 84.718768 70.548828 84.189453 C 71.397794 82.20642 72.017578 79.689411 72.017578 76.568359 C 72.017578 75.294726 71.957988 74.101781 71.853516 72.994141 A 0.50005 0.50005 0 0 0 71.349609 72.535156 A 0.50005 0.50005 0 0 0 70.857422 73.089844 C 70.958947 74.166203 71.017578 75.325993 71.017578 76.568359 C 71.017578 78.289161 70.820718 79.802439 70.503906 81.136719 A 1.0001 1.0001 0 0 0 70 81 L 60.875 81 C 62.26593 79.837884 63.461281 78.650046 64.28125 77.625 C 65.616086 75.956764 66.767792 72.747465 67.757812 69.804688 C 68.4153 67.850347 68.854009 66.374489 69.140625 65.384766 C 69.576065 66.523809 70.069452 68.087055 70.445312 70.113281 A 0.50005 0.50005 0 1 0 71.427734 69.931641 C 70.635671 65.661703 69.330271 63.276963 69.091797 62.863281 C 67.360625 58.845467 64.704298 54.872552 62.101562 51.474609 C 63.362639 52.368636 64.850081 53.27641 66.615234 54.091797 A 0.50029171 0.50029171 0 1 0 67.035156 53.183594 C 60.748503 50.279567 57.910156 46.212891 57.910156 46.212891 A 0.50005 0.50005 0 0 0 57.601562 46.005859 C 57.087008 45.426282 56.571508 44.847111 56.158203 44.400391 C 55.613578 43.811733 55.170073 43.34609 54.861328 43.027344 C 54.706956 42.867971 54.586352 42.745574 54.503906 42.662109 C 54.462686 42.620379 54.431666 42.587996 54.410156 42.566406 C 54.388646 42.544816 54.375 42.53125 54.375 42.53125 A 1.0001 1.0001 0 0 0 52.943359 42.554688 C 49.279661 46.438819 49.298349 50.800469 50.289062 53.982422 C 50.512394 54.699713 50.782545 55.343773 51.066406 55.923828 C 51.350268 56.503884 51.647841 57.019935 51.927734 57.480469 C 44.558127 56.922089 41.261589 53.705706 39.804688 50.351562 C 38.208874 46.67761 38.744141 42.949219 38.744141 42.949219 A 1.0001 1.0001 0 0 0 38.566406 42.220703 C 39.293774 39.085515 40.635345 36.908907 42.066406 35.384766 A 1.0001 1.0001 0 0 0 42.460938 34.990234 C 42.585269 34.868997 42.709449 34.733176 42.833984 34.621094 C 44.250144 33.34655 45.587948 32.701977 46.5 32.353516 L 46.5 34.585938 L 44.792969 36.292969 A 1.0001 1.0001 0 0 0 44.755859 37.669922 L 49.255859 42.669922 A 1.0001 1.0001 0 0 0 50.744141 42.669922 L 55.244141 37.669922 A 1.0001 1.0001 0 0 0 55.207031 36.292969 L 53.5 34.585938 L 53.5 30.787109 z M 32.960938 33.515625 C 33.047426 33.551809 33.127604 33.589503 33.216797 33.625 C 35.141891 34.391143 37.727997 34.982322 40.738281 35.392578 C 39.479351 36.953192 38.365512 39.060506 37.689453 41.806641 A 1.0001 1.0001 0 0 0 37.671875 41.806641 A 1.0001 1.0001 0 0 0 36.792969 42.53125 L 36.476562 43.658203 L 36.474609 43.660156 C 35.037271 45.483767 33.365452 47.093507 31.640625 48.460938 A 0.50005 0.50005 0 1 0 32.261719 49.244141 C 33.518136 48.248061 34.727984 47.093977 35.861328 45.833984 L 32.09375 59.205078 A 0.50005 0.50005 0 0 0 32.091797 59.207031 A 0.50005 0.50005 0 0 0 32.048828 59.283203 C 32.048828 59.283203 28.781473 66.038902 28.097656 73.890625 A 0.50005 0.50005 0 1 0 29.09375 73.976562 C 29.353196 70.997554 29.999277 68.187481 30.689453 65.847656 C 30.862456 66.515702 31.239594 67.943718 31.847656 69.880859 C 32.527792 72.047607 33.317634 74.404093 34.28125 75.980469 C 34.418909 76.205665 34.56014 76.414941 34.705078 76.605469 L 34.703125 76.605469 C 35.696273 77.91108 37.281955 79.493853 39.162109 81 L 30 81 A 1.0001 1.0001 0 0 0 29.503906 81.134766 C 29.178846 79.808795 28.974609 78.32406 28.974609 76.673828 A 0.50005 0.50005 0 0 0 28.466797 76.166016 A 0.50005 0.50005 0 0 0 27.974609 76.673828 C 27.974609 79.27102 28.466095 81.483129 29.15625 83.335938 C 29.501928 84.951101 30.390834 86.483649 31.242188 87.75 C 31.726714 88.470714 31.824854 88.514929 32.212891 88.994141 C 30.349748 89.159823 26.981158 89.362702 22.880859 88.621094 C 20.121091 88.121943 17.417443 87.180979 15.46875 85.587891 C 13.520057 83.994802 12.259766 81.810649 12.259766 78.429688 C 12.259766 66.377076 21.773438 55.767578 21.773438 55.767578 A 1.0001 1.0001 0 0 0 22.023438 55.226562 C 22.859895 54.891819 24.421337 54.234165 26.763672 52.914062 A 0.50005 0.50005 0 0 0 26.496094 51.974609 A 0.50005 0.50005 0 0 0 26.273438 52.042969 C 23.964738 53.344114 22.441232 53.984929 21.640625 54.304688 A 1.0001 1.0001 0 0 0 20.578125 54.205078 C 15.919959 56.586739 12.746694 55.192019 10.431641 53.201172 C 9.7140278 52.584056 9.3042477 51.948142 8.8027344 51.306641 C 9.484036 51.44723 10.239805 51.538078 11.089844 51.494141 C 14.681543 51.30849 19.604679 49.084794 25.40625 41.628906 C 28.050374 38.231388 30.541309 35.589429 32.960938 33.515625 z M 53.777344 44.791016 C 54.045289 45.070937 54.306509 45.341796 54.691406 45.757812 C 55.757781 46.910404 57.221472 48.552564 58.808594 50.501953 C 61.92278 54.326965 65.466665 59.349867 67.423828 64.095703 C 67.338278 64.403384 66.768284 66.4779 65.863281 69.167969 C 64.893801 72.049692 63.545914 75.341236 62.71875 76.375 C 61.597447 77.776744 59.520277 79.740652 57.166016 81.300781 C 54.811754 82.860911 52.168267 84 50 84 C 47.883 84 44.972963 82.680231 42.369141 80.896484 C 39.765318 79.112738 37.430644 76.885008 36.296875 75.394531 A 1.0001 1.0001 0 0 0 36.294922 75.394531 C 35.591472 74.469752 34.512812 71.692718 33.755859 69.28125 C 33.039415 66.998831 32.591774 65.209143 32.539062 65 L 37.167969 48.566406 C 37.36517 49.406627 37.587875 50.267073 37.970703 51.148438 C 39.82739 55.422984 44.373947 59.699219 53.939453 59.699219 A 1.0001 1.0001 0 0 0 54.697266 58.044922 C 54.697266 58.044922 53.049301 56.125219 52.197266 53.388672 C 51.418515 50.887498 51.381461 47.857166 53.777344 44.791016 z M 29.945312 49.820312 A 0.50005 0.50005 0 0 0 29.679688 49.912109 C 29.146044 50.281706 28.617391 50.629983 28.099609 50.955078 A 0.50018678 0.50018678 0 1 0 28.630859 51.802734 C 29.161078 51.46983 29.70169 51.112778 30.248047 50.734375 A 0.50005 0.50005 0 0 0 29.945312 49.820312 z M 69.791016 54.328125 A 0.50005 0.50005 0 0 0 69.671875 55.304688 C 70.427992 55.557743 71.218808 55.789839 72.046875 55.996094 A 0.50022966 0.50022966 0 0 0 72.289062 55.025391 C 71.487129 54.825645 70.720164 54.600414 69.988281 54.355469 A 0.50005 0.50005 0 0 0 69.791016 54.328125 z M 40.5 60 C 39.582 60 38.754859 60.464031 38.130859 61.207031 C 38.394859 61.078031 38.687 61 39 61 C 40.105 61 41 61.895 41 63 C 41 64.105 40.105 65 39 65 C 38.084 65 37.320984 64.381016 37.083984 63.541016 C 37.030984 63.851016 37 64.17 37 64.5 C 37 66.985 38.567 69 40.5 69 C 42.433 69 44 66.985 44 64.5 C 44 62.015 42.433 60 40.5 60 z M 59.5 60 C 58.582 60 57.754859 60.464031 57.130859 61.207031 C 57.394859 61.078031 57.687 61 58 61 C 59.105 61 60 61.895 60 63 C 60 64.105 59.105 65 58 65 C 57.084 65 56.320984 64.381016 56.083984 63.541016 C 56.030984 63.851016 56 64.17 56 64.5 C 56 66.985 57.567 69 59.5 69 C 61.433 69 63 66.985 63 64.5 C 63 62.015 61.433 60 59.5 60 z M 44.5 71.972656 A 0.50005 0.50005 0 0 0 44 72.472656 L 44 73.978516 C 44 75.144993 44.341054 76.230293 44.919922 77.152344 A 0.50005 0.50005 0 0 0 45.046875 77.353516 C 46.127218 78.932122 47.939537 79.972656 49.992188 79.972656 C 53.296458 79.972656 55.986328 77.281875 55.986328 73.978516 L 55.986328 72.472656 A 0.50005 0.50005 0 0 0 55.486328 71.972656 L 44.5 71.972656 z M 45 72.972656 L 54.986328 72.972656 L 54.986328 73.978516 C 54.986328 74.723861 54.812856 75.423963 54.521484 76.058594 C 53.420742 74.797347 51.801626 74 50 74 C 48.192641 74 46.569674 74.803219 45.46875 76.070312 C 45.174557 75.432934 45 74.728302 45 73.978516 L 45 72.972656 z M 50 75 C 51.624286 75 53.054865 75.778159 53.96875 76.974609 C 53.058248 78.18225 51.62539 78.972656 49.992188 78.972656 C 48.362567 78.972656 46.933717 78.185358 46.023438 76.982422 C 46.936778 75.781151 48.370813 75 50 75 z"/></svg>
                </a>
                <SearchComponent/>
            </div>
            {
                !user ?

                <div className="mr-4">
                    <button onClick={() => setLoginModal(true)} className="custom-button">
                        Login
                    </button>
                    { loginModal && createPortal(<LoginModal logModal={setLoginModal} regModal={setRegisterModal}/>,document.getElementById("overlay"))}
                    { registerModal && createPortal(<RegisterModal logModal={setLoginModal} regModal={setRegisterModal}/>,document.getElementById("overlay"))}
                </div> 
                
                :
                <div className="flex mr-4">
                    <div onClick={createOrRetrieve}>
                        <button className="text-black px-2 rounded-md border-black border font-light h-8 transition ease-in-out duration-150 hover:text-blue-600 hover:border-blue-600">Create Post</button>
                    </div>
                    <button className="font-light border rounded-md border-black px-2 h-8 ml-2 transition ease-in-out duration-150 hover:text-blue-600 hover:border-blue-600" onClick={() => {
                        logout();
                        if (window.location.pathname === "/") {
                            navigate(0);
                        } else {
                            navigate('/')
                            navigate(0)
                        }
                    }}>Logout</button>
                    <a href={`http://localhost:3000/user/${userID}`}>
                        {/* { imageURL ? <img className="profile-picture max-h-8 w-8 mx-2" src={imageURL}></img> : null } */}
                        { user ? <GetImage image={user.profile_picture} classes="profile-picture max-h-8 w-8 ml-2" /> : null }
                    </a>
                </div>
            }
        </nav>
    )
}
