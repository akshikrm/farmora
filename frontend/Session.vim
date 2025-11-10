let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Developer/farmora/frontend
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +20 src/App.tsx
badd +21 src/components/layout.tsx
badd +3 src/paths.ts
badd +75 src/pages/users/index.tsx
badd +5 src/api/users.api.ts
badd +4 src/pages/batches/index.tsx
badd +2 src/components/PageTitle.tsx
badd +5 src/components/Table.tsx
badd +7 src/components/TableCell.tsx
badd +8 src/components/TableHeaderCell.tsx
badd +8 src/components/TableRow.tsx
badd +1 src/components/dialog/index.ts
badd +15 src/components/dialog/Dialog.tsx
badd +34 src/utils/fetcher.ts
badd +24 src/types/users.types.ts
badd +9 src/components/dialog/DialogActions.tsx
badd +87 src/pages/users/components/user-form.tsx
badd +1 src/types/paths.types.ts
badd +10 src/types/auth.types.ts
badd +1 src/types/response.types.ts
argglobal
%argdel
$argadd src/App.tsx
edit src/pages/users/index.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
wincmd =
argglobal
balt src/types/users.types.ts
setlocal foldmethod=manual
setlocal foldexpr=0
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
silent! normal! zE
let &fdl = &fdl
let s:l = 78 - ((25 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 78
normal! 0
lcd ~/Developer/farmora/frontend
wincmd w
argglobal
if bufexists(fnamemodify("~/Developer/farmora/frontend/src/pages/users/components/user-form.tsx", ":p")) | buffer ~/Developer/farmora/frontend/src/pages/users/components/user-form.tsx | else | edit ~/Developer/farmora/frontend/src/pages/users/components/user-form.tsx | endif
if &buftype ==# 'terminal'
  silent file ~/Developer/farmora/frontend/src/pages/users/components/user-form.tsx
endif
setlocal foldmethod=manual
setlocal foldexpr=0
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
silent! normal! zE
let &fdl = &fdl
let s:l = 11 - ((10 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 11
normal! 025|
lcd ~/Developer/farmora/frontend
wincmd w
wincmd =
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
